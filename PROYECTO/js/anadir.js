document.addEventListener("DOMContentLoaded",function () {
    let botonAnadir = document.getElementById("botonAnadir");
    botonAnadir.addEventListener("click",post )
});
function post() {
        event.preventDefault();
        //DATOS FORMULARIO
        let vacio = false;
        vacio = comprobarVacio();
        if(vacio == false) {
            let datos = {
                image: separarUrl(document.getElementById("imagen").value),
                marca: document.getElementById("marca").value,
                modelo: document.getElementById("modelo").value,
                fabricacion: Number(document.getElementById("fabri").value),
                kms: Number(document.getElementById("km").value),
                cambio: document.getElementById("cambio").value,
                precio: Number(document.getElementById("precio").value),
                combustible: document.getElementById("combus").value,
                dueno: {
                    nombre: document.getElementById("nombredueno").value,
                    apellidos: document.getElementById("apellidosdueno").value,
                    telefono: document.getElementById("telefono").value

                },
                localidad: {
                    nombre: document.getElementById("localidad").value,
                    provincia: document.getElementById("provincia").value,
                    comunidad_autonoma: document.getElementById("comunidad").value,
                    pais: document.getElementById("pais").value
                }
            }
            console.log(document.getElementById("imagen").value);
            fetch('http://localhost:3000/anuncios', {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then(() => {
                    window.location.href = 'index.html';
                }
            ).catch(error=>console.log(error.message));
        }else {
            alert("Algun campo esta vacio o el numero de telefono supera la longitud");
        }
}
function separarUrl(cadena){
    let arrayUrl = cadena.split("\\");
    return arrayUrl[2];

}
function comprobarVacio(){
    let arrayInput = document.querySelectorAll("p>input");
    let telefono = document.getElementById("telefono").value;
    for (let input of arrayInput){
        if(input.value == ""){
            console.log(input.value);
            return true;
        }

    }
    //Comprobar telefono
    let exp = /^\d{9}$/;
    console.log(telefono);
    if(!exp.test(Number(telefono))){
        return true;
    }
    return false;

}
