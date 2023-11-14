
// Dependencies
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
const MongoClient = require("mongodb").MongoClient;

const uri = `mongodb+srv://augusto:WAiYtpJqmUg57bMm@devweb.f20bfdj.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true });

// Express init
var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views')
var server = http.createServer(app);

console.log("server initialized...");

app.post("/cadastro", function (req, resp) {
    // realiza conexão com banco de dados
    client.connect((err) => {
        // salva dados no banco
        client.db("exemplo_bd").collection("usuarios").insertOne(
            { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha }, function (err) {
                login = ""
                nome = ""
                senha = ""
                mensagem = ""
                if (err) {
                    cadastro = "Erro no cadastro!"
                    resp.render('resposta', { cadastro, login, senha, mensagem })
                } else {
                    cadastro = "Usuário cadastrado com sucesso!"
                    login = req.body.login
                    senha = req.body.senha
                    resp.render('resposta', { cadastro, login, senha, mensagem })
                };
            });
    });

});

app.post("/login", function (req, resp) {
    // realiza conexão com banco de dados
    client.connect((err) => {
        // busca um usuário no banco de dados
        client.db("exemplo_bd").collection("usuarios").find(
            { db_login: req.body.login, db_senha: req.body.senha }).toArray(function (err, items) {
                console.log(items);
                cadastro = "Login: "
                login = ""
                senha = ""
                mensagem = ""
                if (items.length == 0) {
                    mensagem = "Usuário/senha não encontrado!"
                    resp.render('resposta', { cadastro, login, senha, mensagem })
                } else if (err) {
                    mensagem = "Usuário/senha não encontrado!"
                    resp.render('resposta', { cadastro, login, senha, mensagem })
                } else {
                    mensagem = "Usuário logado com sucesso!"
                    login = req.body.login
                    senha = req.body.senha
                    resp.render('resposta', { cadastro, login, senha, mensagem })
                };
            });
    });

});

app.get("/listar_usuarios", function (req, resp) {

    client.connect((err) => {
        // busca todos os usuarios no banco de dados
        client
            .db("exemplo_bd")
            .collection("usuarios")
            .find().toArray(function (err, items) {
                // renderiza a resposta para o navegador
                resp.render("listarusuarios", { usuarios: items });
            });
    });

});

app.post("/atualizar_usuario", function (req, resp) {

    // realiza conexão com banco de dados
    client.connect((err) => {
        // atualiza senha do usuário
        client.db("exemplo_bd").collection("usuarios").updateOne(
            { db_login: req.body.login, db_senha: req.body.senha },
            { $set: { db_senha: req.body.novasenha } }, function (err, result) {
                console.log(result);
                if (result.modifiedCount == 0) {
                    resp.render('resposta', {cadastro: "Usuário/senha não encontrado!",login: "", senha:"",mensagem:""})
                } else if (err) {
                    resp.render('resposta', {cadastro: "Erro ao atualizar usuário!",login: "", senha:"",mensagem:""})
                } else {
                    resp.render('resposta', {cadastro: "Usuário atualizado com sucesso!",login: "", senha:"",mensagem:""})
                };
            });
    });

});


app.post("/remover_usuario", function (req, resp) {

    // realiza conexão com banco de dados
    client.connect((err) => {

        // remove do usuário
        client.db("exemplo_bd").collection("usuarios").deleteOne(
            { db_login: req.body.login, db_senha: req.body.senha }, function (err, result) {
                console.log(result);
                if (result.deletedCount == 0) {
                    resp.render('resposta', {cadastro: "Usuário/senha não encontrado!",login: "", senha:"",mensagem:""})
                } else if (err) {
                    resp.render('resposta', {cadastro: "Erro ao remover usuário!",login: "", senha:"",mensagem:""})
                } else {
                    resp.render('resposta', {cadastro: "Usuário removido com sucesso!",login: "", senha:"",mensagem:""})
                };
            });
    });
});

// Blog
app.get("/blog", function (req, resp) {

    client.connect((err) => {
        // busca todos os usuarios no banco de dados
        client
            .db("blog")
            .collection("posts")
            .find().toArray(function (err, items) {
                // renderiza a resposta para o navegador
                resp.render("blog", { posts: items });
            });
    });

});

app.post("/blog/criar", function (req, resp) {
    // realiza conexão com banco de dados
    client.connect((err) => {
        // salva dados no banco
        client.db("blog").collection("posts").insertOne(
            { titulo: req.body.titulo, resumo: req.body.resumo, conteudo: req.body.conteudo }, function (err) {
                if (err) {
                    mensagem = "Erro na postagem!"
                    resp.render('respostablog', { mensagem })
                } else {
                    mensagem = "Postado!"
                    resp.render('respostablog', { mensagem })
                };
            });
    });

});

// Server port
server.listen(80);