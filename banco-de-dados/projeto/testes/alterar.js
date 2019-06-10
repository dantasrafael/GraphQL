const db = require('../config/db')

const novoUsuario = {
    nome: 'Pedro',
    email: 'pedro@email.com',
    senha: '12345678'
}

async function exercicio() {
    const { qtde } = await db('usuarios').count('* as qtde').first();
    console.log('qtde =' + qtde);

    // cadastrar caso venha vazio
    if (qtde === 0 || qtde == undefined) {
        await db('usuarios').insert(novoUsuario);
    }

    // consultar
    let { id } = await db('usuarios').select('id').limit(1).first();
    console.log('id =' + id);

    // alterar
    await db('usuarios').where({ id }).update({ nome: 'Pedro Garcia' });

    return await db('usuarios').where({ id });
} 


exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy());