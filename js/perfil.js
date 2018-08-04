const btnPush = document.getElementById("btn-push")
const btnUpdate = document.getElementById("btn-update")
const btnSet = document.getElementById("btn-set")

const refTestDB = firebase.database().ref("test")

btnPush.addEventListener("click", event => {
    refTestDB.push({
        id: 1,
        nombre: "test 1"
    })
})

btnUpdate.addEventListener("click", event => {
    refTestDB.child("-LJ1WhEcPeS0XV1I298f").update({
        nombre: "test 1 actualizado"
    })
})

btnSet.addEventListener("click", event => {
    // este guarda el objeto asi como se le pasa sin generar id y pisa los otros
    refTestDB.set({
        id: 2,
        nombre: "test anterior pisado al usar set"
    })
})

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        mostrarLogout()
        usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid
        }
        agregarUsuario(usuario)
        leerDatosUsuario(user.uid)
    } else {
        mostrarLogin()
        window.location.href = "index.html"
    }
})

function leerDatosUsuario(uid) {
    refUserDB.child(uid).once("value", data => llenarDatosUsuario(data.val()))
}

function llenarDatosUsuario(data) {
    document.getElementById("perfilNombre").innerHTML = data.nombre
    document.getElementById("perfilEmail").innerHTML = data.email
    document.getElementById("perfilTelefono").innerHTML = data.telefono || ""
    document.getElementById("perfilDireccion").innerHTML = data.direccion || ""
}