const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { createEntity, readEntity, readEntities, updateEntity, deleteEntity } = require("./entity.js");

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.post("/:namespace/:type", async (req, res) => {
    console.log("Entity Post");
    const newEntity = req.body;
    const createdEntity = await createEntity(req.params.namespace, req.params.type, newEntity);
    res.status(201).json(createdEntity);
})

app.get('/:namespace/:type/', async (req, res) => {
    console.log("Get entities");
    const entities = await readEntities(req.params.namespace, req.params.type);
    res.status(200).json(entities);
})

app.get('/:namespace/:type/:id', async (req, res) => {
    console.log("Get entity");
    const entity = await readEntity(req.params.namespace, req.params.type, req.params.id);
    if (entity) {
        res.status(200).json(entity);
    } else {
        res.status(404).json({ "message": "entity not found" });
    }
})

app.put("/:namespace/:type/:id", async (req, res) => {
    console.log("Entity Put");
    const entity = await readEntity(req.params.namespace, req.params.type, req.params.id);
    if (entity) {
        const newEntity = req.body;
        const updatedEntity = await updateEntity(req.params.namespace, req.params.type, req.params.id, newEntity);
        res.status(200).json(updatedEntity);
    } else {
        res.status(404).json({ "message": "entity not found" });
    }

})

app.delete("/:namespace/:type/:id", async (req, res) => {
    console.log("Entity Delete");
    const entity = await readEntity(req.params.namespace, req.params.type, req.params.id);
    if (entity) {
        await deleteEntity(req.params.namespace, req.params.type, req.params.id);
        res.status(200).json({ "message": "deleted" });
    } else {
        res.status(404).json({ "message": "entity not found" });
    }
})

// export 'app'
module.exports = app