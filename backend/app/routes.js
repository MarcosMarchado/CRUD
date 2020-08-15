const router = require('express').Router()
const Produto = require('../models/Produto')

router.get("/", async (req, res) => {
    try {
        const produto = await Produto.find()
        res.json(produto)
    } catch (e) {
        res.status(400).send({ error: "erro na requisição" })
        console.log(`error ${e}`)
    }
})

router.post("/", async (req, res) => {
    const { nome, preco } = req.body
    try {
        const produto = await Produto.create({ nome, preco })
        res.json(produto)
    } catch (e) {
        res.status(400).send({ error: "erro na requisição" })
        console.log(`error ${e}`)
    }
})

router.put("/", async (req, res) => {
    const { nome, preco, id } = req.body
    try {
        await Produto.findByIdAndUpdate(id, { '$set': { nome, preco } })
        res.status(201).send({ message: "Produto Atualizado com sucesso!" })
    } catch (e) {
        res.status(400).send({ error: "erro na requisição" })
    }
})

router.delete("/", async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.body.id)
        res.status(201).send({ message: "Produto Deletado com sucesso!" })
    } catch (e) {
        res.status(400).send({ error: "erro na requisição" })
    }
})

module.exports = router