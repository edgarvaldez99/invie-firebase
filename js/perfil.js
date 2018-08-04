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