module.exports = async ({ req }) => {
    // Em desenvolvimento
    await require('./mockUsuarioLogado')(req)

    const auth = req.headers.authorization
    console.log(auth)       
}