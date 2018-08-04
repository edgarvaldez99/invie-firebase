const btnPush = document.getElementById("btn-push")
const btnUpdate = document.getElementById("btn-update")
const btnSet = document.getElementById("btn-set")

const btnPerfilEditar = document.getElementById("perfilEditar")
const btnCancelar = document.getElementById("cancelForm")
const datosPerfil = document.getElementById("datosPerfil")
const formularioPerfil = document.getElementById("formularioPerfil")

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
    refUserDB.child(uid).on("value", data => llenarDatosUsuario(data.val()))
}

function llenarDatosUsuario(data) {
    if (data) {
        document.getElementById("perfilNombre").innerHTML = data.nombre
        document.getElementById("perfilEmail").innerHTML = data.email
        document.getElementById("perfilTelefono").innerHTML = data.telefono || ""
        document.getElementById("perfilDireccion").innerHTML = data.direccion ? data.direccion.calle+" "+data.direccion.interior+" "+data.direccion.colonia+" CP: "+data.direccion.cp : ""
    }
}

function ocultarFormulario() {
    datosPerfil.style.display = "block"
    formularioPerfil.style.display = "none"
}

btnPerfilEditar.addEventListener("click", event => {
    event.preventDefault()
    datosPerfil.style.display = "none"
    formularioPerfil.style.display = "block"
})

btnCancelar.addEventListener("click", event => {
    event.preventDefault()
    ocultarFormulario()
})

formularioPerfil.addEventListener("submit", event => {
    event.preventDefault()
    const user = Array.prototype.map.call(formularioPerfil.querySelectorAll("input"), input => {
        keys = input.name.split(".")
        return keys.length > 1 ? { [keys[0]]: { [keys[1]]: input.value }} : { [keys[0]]: input.value }
    }).reduce((before, current) => mezclarDatos(before, current))
    console.log(user)
    refUserDB.child(usuario.uid).update(user)
    ocultarFormulario()
})

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mezclarDatos(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mezclarDatos(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mezclarDatos(target, ...sources);
}