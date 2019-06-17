const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')

module.exports = {
    async novoPerfil(_, { dados }) {
        try {
            await db('perfis').insert(dados)
            return await db('perfis').where({ nome: dados.nome }).first()
        } catch (e) {
            throw new Error(e);
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if (perfil) {
                const { id } = perfil
                await db('usuario_perfil').where({ perfil_id: id }).delete()
                await db('perfis').where({ id }).delete()
            }
            return perfil;
        } catch (e) {
            throw new Error(e);
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        try {
            const perfil = await obterPerfil(_, { filtro })
            if (perfil) {
                const { id } = perfil
                await db('perfis').where({ id }).update(dados)
            }
            return { ...perfil, ...dados };
        } catch (e) {
            throw new Error(e);
        }
    }
}