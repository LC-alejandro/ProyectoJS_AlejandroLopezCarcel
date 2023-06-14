let contenedorPrincipal = document.getElementById("cajaAnuncios");
let botonPrecio = document.getElementById("precioFiltrar");
//CLASE PARA CREAR CADA ANUNCIO DEL VEHICULO
class Anuncio{
  constructor(anuncio) {
      this.image = anuncio.image;
      this.id = anuncio.id;
      this.marca = anuncio.marca;
      this.modelo = anuncio.modelo;
      this.fabricacion = anuncio.fabricacion;
      this.kms = anuncio.kms;
      this.cambio = anuncio.cambio;
      this.precio = anuncio.precio;
      this.combustible = anuncio.combustible;
      this.nombre = anuncio.dueno.nombre;
      this.apellidos = anuncio.dueno.apellidos;
      this.telefono = anuncio.dueno.telefono;
      this.nombreLocalidad = anuncio.localidad.nombre;
      this.provincia = anuncio.localidad.provincia;
      this.comunidad = anuncio.comunidad;
      this.pais = anuncio.pais;
  }
  toDiv(){
      let nuevaEntrada = document.createElement("div");
      nuevaEntrada.classList = "anuncio";
      contenedorPrincipal.appendChild(nuevaEntrada);

      nuevaEntrada.innerHTML = "<div class=\"botones\"><button class='borrar'>\n" +
          " \n" +
          " \n" +
          "<i class=\"fa-solid fa-trash\"></i></button>\n" +
          "    <button class='editar'><i class=\"fa-solid fa-pen-to-square\"></i></button></div>"+"<div class=\"arriba\">\n" +
          "            <div class=\"cajaIz\">\n" +
          "                <div class=\"imagen\"><img src=\"images/"+this.image+"\"></div>\n" +
          "\n" +
          "            </div>\n" +
          "            <div class=\"cajaDere\">\n" +
          "                <p class=\"marcaModeloFabricacion\">"+this.marca+" "+this.modelo +" "+this.fabricacion+"</p>\n" +
          "                <p class=\"localidad\">"+this.nombreLocalidad+", Provincia: "+ this.provincia+"</p>\n" +
          "                <p class=\"kms\">Kilometraje: "+this.kms+" kms</p>\n" +
          "                <p class=\"precio\">Precio: "+this.precio+" €</p>\n" +
          "                <p class=\"cambio\">Cambio: "+this.cambio+"</p>\n" +
          "                <p class=\"combustible\">Combustible: "+this.combustible+"</p>\n" +
          "            </div>\n" +
          "        </div>\n" +
          "        <div class=\"contacto\">CONTACTA CON: "+this.nombre+" "+this.apellidos+"</div>\n" +
          "        <div class=\"contacto\">Telefono: <a href='tel:+34"+this.telefono+"'>"+this.telefono+"</a></div>";
      //EVENTO PARA CAPTURAR EL BOTON DE BORRAR DE CADA ANUNCIO
      let botonBorrar = nuevaEntrada.querySelector(".borrar");
      botonBorrar.addEventListener("click",()=> {
        if(confirm("¿Desea borrar el anuncio?") == true){
          fetch('http://localhost:3000/anuncios/'+this.id, {
              method: 'DELETE',
          }).catch(error=>console.log(error));
          nuevaEntrada.remove();


          }
      });
      //EVENTO PARA CAPTURAR EL BOTON DE EDITAR DE CADA ANUNCIO
      let botonEditar = nuevaEntrada.querySelector(".editar");
      botonEditar.addEventListener("click",()=>{
          //Nos manda a la pagina para editar junto con el id
          window.location.href="editar.html?id="+this.id;
      });


  }

}
//CUANDO CARGUE LA PAGINA SE REALIZARA UNA PETICION GET PARA TRAER LOS DISTINTOS ANUNCIOS DE VEHICULOS
document.addEventListener("DOMContentLoaded",function () {
        contenedorPrincipal.innerHTML = "";
        fetch("http://localhost:3000/anuncios").then(response=>response.json()).
        then(objAnuncioJson=>{
            let posts = []
            for (let anuncio of objAnuncioJson){
                posts.push(new Anuncio(anuncio));
            }
            return posts;
        }).then(posts=>{
            for (let post of posts){
                post.toDiv();
            }
        }).catch(error=>console.log(error.message));
    //EVENTO PARA CUANDO PULSE EL BOTON CREAR ANUNCIO
    let botonAnadir = document.querySelector("#anadir");
    botonAnadir.addEventListener("click",()=>{
        //NOS MANDA A LA PAGINA PARA AÑADIR UN NUEVO ANUNCIO
        window.location.href="anadirAnucio.html";
    });
    //EVENTO PARA BUSCAR POR PRECIO MAXIMO (MEJORA DE PROYECTO)
    botonPrecio.addEventListener("click",filtarPrecio);
});
function filtarPrecio() {
    // FILTRAR POR PRECIO
    let inputPrecio = document.getElementById("precioIntro")
    //SPINNER
    contenedorPrincipal.innerHTML = "<img src='recursos/rueda.gif' id='gif'>";
    let valorPrecio = inputPrecio.value;

    fetch("http://localhost:3000/anuncios").then(response=>response.json())
        .then(objAnuncios=>{
            let postFiltrado = [];
            for(let anuncio of objAnuncios){
                if(valorPrecio != "") {
                    if (anuncio.precio <= Number(valorPrecio)) {
                        postFiltrado.push(new Anuncio(anuncio));
                    }
                }else{
                    postFiltrado.push(new Anuncio(anuncio));
                }
            }
            return postFiltrado;
        }).then(posts=>{
        for (let post of posts){
            post.toDiv();
        }
        //BORRAR SPINNER
        let gif = document.getElementById("gif");
        gif.remove();
    }).catch(error=>console.log(error.message));

}



