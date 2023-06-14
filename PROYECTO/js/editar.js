
let srcImagen =  document.querySelector("img");
//CUANDO CARGUE LA PAGINA SE REALIZAN LAS FUNCIONES
document.addEventListener("DOMContentLoaded",function () {
    //RECOGER EL ID DE LA URL
    let urlSearchParams = new URLSearchParams(window.location.search);
    let id = urlSearchParams.get("id");
    //Rellenar el formulario con los valores sin editar
    establecerValores(id);
    cargarImagen();

    let botonEditar = document.getElementById("botonEditar");
    //Cuando pulse el boton se modificaran los campos con los valores introducidos
    botonEditar.addEventListener("click",()=>{
        editarAnuncio(id);
    })
});
function cargarImagen(){
    document.getElementById("imagen").addEventListener('change',event => {
        let file = event.target.files[0];
        let reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }
        reader.addEventListener('load',e =>{
            document.querySelector("img").src = reader.result;
        })
    })
}
function establecerValores(id) {
    fetch('http://localhost:3000/anuncios/' + id).then(res => res.json()).then(post => {
        document.querySelector("img").src = "images/"+post.image;
        document.getElementById("marca").value = post.marca;
        document.getElementById("modelo").value = post.modelo;
        document.getElementById("fabri").value = post.fabricacion;
        document.getElementById("km").value = post.kms;
        document.getElementById("precio").value = post.precio;
        document.getElementById("combus").value = post.combustible;
        document.getElementById("cambio").value = post.cambio;
        document.getElementById("nombredueno").value = post.dueno.nombre;
        document.getElementById("apellidosdueno").value = post.dueno.apellidos;
        document.getElementById("telefono").value = post.dueno.telefono;
        document.getElementById("localidad").value = post.localidad.nombre;
        document.getElementById("provincia").value = post.localidad.provincia;
        document.getElementById("comunidad").value = post.localidad.comunidad_autonoma;
        document.getElementById("pais").value = post.localidad.pais;

    });
}
function editarAnuncio(id) {
    event.preventDefault();
    //DATOS FORMULARIO
    let vacio = false;
    vacio = comprobarVacio();
    //Si alguno de los campos esta vacio o el numero de telefono no cumple con la longitud,no se podra enviar el formulario de datos
    if(vacio == false) {
        //RECOGIDA DE DATOS MODIFICADOS
        let datosModificados = {
            image: imagenModify(document.getElementById("imagen").value),
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
        //PETICION PARA MODIFICAR LOS DATOS
        fetch('http://localhost:3000/anuncios/' + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosModificados)
        }).then(() => {
                window.location.href = 'index.html';
        }).catch(error=>console.log(error.message));
    }else {
        alert("Algun campo esta vacio o el numero de telefono supera la longitud");
    }
}
function imagenModify(imagen){

    if(imagen == ""){
        return separarUrl2(srcImagen.src);
    }else{
        return separarUrl(imagen);
    }
}
function separarUrl2(cadena) {
    let arrayUrl = cadena.split("/");
    console.log(cadena);
    return arrayUrl[6];
}
function separarUrl(cadena){
    let arrayUrl = cadena.split("\\");
    return arrayUrl[2];

}
//FUNCION PARA COMPROBAR QUE NINGUN CAMPO ESTA VACIO
function comprobarVacio(){
    let arrayInput = document.querySelectorAll("p>.vacio");
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