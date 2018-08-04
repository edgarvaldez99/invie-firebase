const btnLogin = document.getElementById("btn-login")
const btnLogout = document.getElementById("btn-logout")
const btnLoginConFacebook = document.getElementById("btn-login-con-facebook")

const refUserDB = firebase.database().ref("usuario")
let usuario = {}

mostrarLogout()

btnLogin.addEventListener("click", event => {
    event.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    signInWithPopup(provider)
})

btnLoginConFacebook.addEventListener("click", event => {
    event.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    signInWithPopup(provider)
})

btnLogout.addEventListener("click", event => {
    event.preventDefault()
    firebase.auth().signOut().then(() => console.log("Cerró correctamente"))
})

function btnLoginForEach(foreachFunction) {
    [].forEach.call(document.getElementsByClassName("btn-login"), foreachFunction);
}

function mostrarLogin() {
    btnLoginForEach(btn => btn.parentElement.style.display = "block")
    btnLogout.parentElement.style.display = "none"
}

function mostrarLogout() {
    btnLoginForEach(btn => btn.parentElement.style.display = "none")
    btnLogout.parentElement.style.display = "block"
}

function signInWithPopup(provider) {
    firebase.auth().languageCode = 'es';
    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(error => console.log(error, (error && error.message ? JSON.parse(error.message) : '')))
}

function agregarUsuario(usuario) {
    refUserDB.push(usuario)
}