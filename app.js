const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./models/Produtos");

//Configurar BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cadastro", function(req, res){
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(() => {
        res.status(201).send("Produto cadastrado com sucesso!");
    }).catch((erro) => {
        res.status(500).send("Erro ao cadastrar: " + erro);
    });
});

app.get("/produtos", function(req, res){
    Produtos.findAll().then((produtos) => {
        res.json(produtos);
    }).catch((erro) => {
        res.status(500).send("Erro ao buscar: " + erro);
    });
});

app.get("/produto/:nome", function(req, res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then((produto) => {
        if(produto.length === 0) return res.status(404).send("Produto não encontrado.");
        res.json(produto);
    }).catch((erro) => {
        res.status(500).send("Erro na consulta: " + erro);
    });
});

app.patch("/atualizar/:id", function(req, res){
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where: {"id": req.params.id}}
    ).then(() => {
        res.send("Sucesso ao atualizar!");
    }).catch((erro) => {
        res.status(500).send("Erro ao atualizar: " + erro);
    });
});

app.delete("/deletar/:id", function(req, res){
    Produtos.destroy({where: {"id": req.params.id}}).then(() => {
        res.send("Produto deletado com sucesso!");
    }).catch((erro) => {
        res.status(500).send("Erro ao deletar: " + erro);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
