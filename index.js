const express = require('express');
const server = express();

server.use(express.json());

const users = ['Luiz', 'Ana', 'Katia', 'Kayke'];

//midiwer global
server.use((req, res, next) => {
  console.timeEnd('Requisição');
  console.log(`Método: ${req.method}; URL: ${req.url} `);

  return next();

  console.log('Requisição');
})

//midiwer local
function checkUsuarioExiste(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'O nome é obrigatorio!!!' });
  }

  return next();
}

function checkUsuarioInArray(req, res, next) {
  const usuario = users[req.params.index];
  
  if (!usuario) {
    return res.status(400).json({ error: 'Usuario não existe!!!'});
  }

  req.usuario = usuario;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
})

server.get('/users/:index', checkUsuarioInArray,(req, res) => {
  console.log('teste porta 3000');
  
  return res.json(req.usuario);
})
//Incluir
server.post('/users', checkUsuarioExiste, (req, res) =>{
  const { name } = req.body;

  users.push(name);

  return res.json(users);
})
//Editar
server.put('/users/:index', checkUsuarioInArray, checkUsuarioExiste, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users [index] = name;

  return res.json(users);
})
//Deleta
server.delete('/users/:index', checkUsuarioInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send(200);

})

server.listen(3000);
