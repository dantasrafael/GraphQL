const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = [];
            if (dados.perfis) {
                for (let filtro of dados.perfis) {
                    const perfil = await obterPerfil(_, { filtro });
                    if (perfil) {
                        idsPerfis.push(perfil.id);
                    } 
                }
            }

            delete dados.perfis;
            await db('usuarios').insert({ ...dados });
            const usuario = await db('usuarios').where({ nome: dados.nome }).first();

            for (let perfil_id of idsPerfis) {
                await db('usuario_perfil').insert({ perfil_id, usuario_id:usuario.id });
            }

            return usuario;
        } catch (e) {
            throw new Error(e);
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if (usuario) {
                const { id } = usuario
                await db('usuario_perfil').where({ usuario_id: id }).delete()
                await db('usuarios').where({ id }).delete()
            }
            return usuario;            
        } catch (e) {
            throw new Error(e);
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if (usuario) {
                const { id } = usuario
                if (dados.perfis) {
                    await db('usuario_perfil').where({ usuario_id: id }).delete();
                    for (let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, { filtro });
                        perfil && await db('usuario_perfil').insert({ perfil_id: perfil.id, usuario_id:id });
                    }
                }
                
                delete dados.perfis;
                await db('usuarios').where({ id }).update(dados);
            }
            return !usuario ? null : { ...usuario, ...dados };
        } catch (e) {
            throw new Error(e);
        }
    }
}