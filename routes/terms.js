const express = require("express");
const termModel = require("../models/term");
const app = express();

app.get("/", async (request, response) => {
    const terms = await termModel.find({});

    try {
        response.send(terms);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.post("/", async (request, response) => {
    const term = new termModel(request.body);

    try {
        await term.save();
        response.send(term);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.patch("/:id", async (request, response) => {
    try {
        let term = await termModel.findByIdAndUpdate(request.params.id, request.body);
        if (!term) {
            term = await termModel.save();
        }
        response.send(term);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.delete("/:id", async (request, response) => {
    try {
        const term = await termModel.findByIdAndDelete(request.params.id);
        if (!term) response.status(404).send("No term found");
        response.status(200).send();
    } catch (error) {
        console.log(error)
        response.status(500).send(error);
    }
});

module.exports = app;