const mongoose = require('mongoose')


const Produto = new mongoose.Schema({
    nome: String,
    preco: Number,
})

module.exports = mongoose.model('Produto', Produto)