const { Deta } = require("deta");
const { v4: uuid_v4 } = require('uuid');

const deta = Deta();

async function createEntity(namespace, type, data) {
    const db = getdb(namespace, type);
    data.key = uuid_v4();
    console.log(data);
    const newEntity = await db.put(data);
    return newEntity;
}

async function readEntities(namespace, type) {
    console.log("readEntities")
    const db = getdb(namespace, type);
    const entity = await db.fetch({});
    console.log(entity.items);
    return entity.items;
}

async function readEntity(namespace, type, id) {
    console.log("readEntity: " + id);
    const db = getdb(namespace, type);
    const entity = await db.get(id);
    console.log("Entity found: " + entity);
    return entity;
}

async function updateEntity(namespace, type, id, data) {
    console.log("updateEntity")
    const db = getdb(namespace, type);
    data.key = id;
    console.log(data);
    const entity = await db.put(data);
    return entity;
}

async function deleteEntity(namespace, type, id) {
    console.log("deleteEntity")
    const db = getdb(namespace, type);
    await db.delete(id);
}

function getdb(namespace, type) {
    return deta.Base(namespace + "-" + type);
}

module.exports = {
    createEntity,
    readEntity,
    readEntities,
    updateEntity,
    deleteEntity
};