const btnLogin = document.getElementById("btn-login")
const btnLogout = document.getElementById("btn-logout")
const btnLoginConFacebook = document.getElementById("btn-login-con-facebook")

mostrarLogout()

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        mostrarLogout()
    } else {
        mostrarLogin()
    }
})

btnLogin.addEventListener("click", event => {
    event.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    firebase.auth().languageCode = 'es';
    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(() => console.log("error"))
})

btnLoginConFacebook.addEventListener("click", event => {
    event.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    firebase.auth().languageCode = 'es';
    firebase.auth().signInWithPopup(provider)
        .then(datosUsuario => console.log(datosUsuario))
        .catch(() => console.log("error"))
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