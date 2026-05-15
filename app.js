const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Produtos = require("./models/Produtos");

//Configurar BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/cadastro",function(req,res){
    Produtos.create({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao
    }).then(function(){
        res.send("Produto cadastrado com sucesso!")
    }).catch(function(erro){
        res.send("Erro ao cadastrar o produto " + erro);
    });
});

app.get("/", function(req,res){
    Produtos.findAll().then(function(produtos){
        res.send(produtos)
    }).catch(function(erro){
        res.send("Erro ao buscar os dados " + erro);
    })
});

app.get("/:nome",function(req,res){
    Produtos.findAll({where: {"nome": req.params.nome}}).then(function(produto){
        res.send(produto);
        res.send("Consulta realizada com sucesso!");
    }).catch(function(erro){
        res.send("Produto não existe na base de dados " + erro)
    });
});

app.patch("/atualizar/:id",function(req,res){
    Produtos.update({
        nome: req.body.nome,
        preco: req.body.preco,
        descricao: req.body.descricao},
        {where: {"id": req.params.id}}
    ).then(function(){
        res.send("Sucesso ao atualizar os dados do produto!");
    }).catch(function(erro){
        res.send("Erro ao atualizar os dados do produto " + erro);
    });
});

app.delete("/deletar/:id",function(req,res){
    Produtos.destroy({where: {"id": req.params.id}}).then(function(){
        res.send("Produto deletado com sucesso!");
    }).catch(function(erro){
        res.send("Erro ao deletar o produto " + erro);
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT,"0.0.0.0",function(){
    console.log("Servidor está rodando..")
});

