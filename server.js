// Pacotes  necessários
const express = require('express');
const body_parser = require('body-parser');
// const mongodb = require("mongodb");

// // Conexão com banco de dados
// const MongoClient = mongodb.MongoClient;
// const uri = `mongodb+srv://fagnerpimentel:iM8a2psNRCRnmnc5@auladb.ef34oxt.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true });

// Configuraçao do servidor
var app = express();
app.use(express.static('./public'));
// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(body_parser.urlencoded({ extended: false }));
// app.use(body_parser.json());

// iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor de jogos iniciado.');
});

////////////////////////////////////////////////////////////////////////////////

// require('./actions/usuarios')(app, client);
// require('./actions/blog')(app, client);
// require('./actions/restaurante')(app, client);
// require('./actions/lembretes')(app, client);
// require('./actions/biblioteca')(app, client);
