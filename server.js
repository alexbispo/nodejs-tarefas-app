var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');   // Loga as requisições para o console
var bodyParser = require('body-parser');  // Obetem informaçõs a partir do HTML POST
var methodOverride = require('method-override'); // simula os métodos HTTP DELETE e PUT

mongoose.connect('mongodb://localhost:27017/tarefasdb', function(err){
	if(err){
		console.log("Erro ao tentar se conectar com o MongoDB");
	} else {
		console.log("Conexão com o MongoDB realizada com sucesso");
	}
});

app.use(express.static(__dirname + '/public')); // Seta a localização dos arquivos públicos
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// definindo o modelo
var Tarefa = mongoose.model('Tarefa',{
	texto : String
} );

// rotas ==================

// Obtem todas tarefas
app.get('/api/tarefas', function (req, res) {
	
	Tarefa.find(function (err, tarefas) {
		if(err){
			res.send(err);
		}
		
		res.json(tarefas);
	});
});

app.post('/api/tarefas', function (req, res) {
	Tarefa.create(
		{
			texto : req.body.texto,
			done : false
		}, function (err, tarefa) {
		
			if(err){
				res.send(err);
			}
			
			Tarefa.find(function (err, tarefas) {
				if(err){
					res.send(err);
				}
				res.json(tarefas);
				
			});		
	});
});

app.delete('/api/tarefas/:tarefa_id', function (req, res) {
	Tarefa.remove(
		{
			_id : req.params.tarefa_id
		}, function (err, tarefa) {
		
			if(err){
				res.send(err);
			}
			
			Tarefa.find(function (err, tarefas) {
				if(err){
					res.send(err);
				}
				res.json(tarefas);
				
			});		
	});
});

app.get('*', function (req, res) {
	res.sendfile('./public/index.html');
});


app.listen(8080);
console.log("App trefas executando com nodemon, escutando na porta 8080");  
