const db = require('../config/db')

const novoPerfil = {
    nome: 'visitante',
    rotulo: 'Visitante'
}

db('perfis')
    .insert(novoPerfil)
    .then(res => console.log(res))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy())