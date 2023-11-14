//inclui o módulo http
var http = require('http');
//inclui o módulo express
var express = require('express');

//cria a variável app, pela qual acessaremos os métodos, funções existentes no framework express
var app = express();

//método use() utilizado para definir em qual pasta estará o conteúdo estático
app.use(express.static('./public'));

//criar servidor
var server = http.createServer(app);

//define o número da porta do servidor
server.listen(80);

console.log("servidor rodando...")