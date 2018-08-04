firebase.auth().onAuthStateChanged(user => {
    if (user) {
        mostrarLogout()
        usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid
        }
        agregarUsuario(usuario)
        window.location.href = "perfil.html"
    } else {
        mostrarLogin()
    }
})