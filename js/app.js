1//Albin Cordero 08/6/21

// Solicitud de Nombre 
const nombre2 = prompt('Cual es tu nombre');
if (nombre2 == null || nombre2==''){
document.querySelector('#nombre').innerHTML= 'Bienvenido  Anonimo ';
}
else
{
document.querySelector('#nombre').innerHTML=` Bienvenido  ${nombre2}  `;
}
//global
let total=0; 

// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const vaciarCarritoBt2 = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


        vaciarCarritoBt2.addEventListener('click',limpiar);


// NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });
}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
         
	const prec = curso.querySelector('.precio span').textContent.split("$");
 
 leerDatosCurso(curso);

     }
alert('Wow Muchas Gracias Aprovecha nuestra semana de Oferta!!!');
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
       total=0;		
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
       articulosCarrito.forEach( curso =>{
const prec= curso.precio.split("$");
const tt = Number.parseInt(prec[1]);
total=total+(tt*curso.cantidad)	;
}
)
document.querySelector('#subtotal').innerHTML=`  $ ${total}  `;
console.log(total);

          carritoHTML();
alert('Bueno si es lo que decides , Suerte!!');
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();
let total =0;
     articulosCarrito.forEach(curso => {
const prec= curso.precio.split("$");
total = total +(prec[1]*curso.cantidad);

          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td></td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
 
          `;
          contenedorCarrito.appendChild(row);
     });
document.querySelector('#subtotal').innerHTML=`  $ ${total}  `;
console.log(total);
// NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
console.log
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }

}
function limpiar() {
total=0;
document.querySelector('#subtotal').innerHTML=`  $ ${total}  `;
alert('Wow Enserio , Esta bien Empezamos de Nuevo!!');
articulosCarrito = articulosCarrito.filter(curso => curso.id == 0);

}