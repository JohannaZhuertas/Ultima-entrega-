let shopYog = document.getElementById("shopYog");
const verCarrito = document.getElementById("verCarrito");
const seccionContainer = document.getElementById("seccionContainer");
let buscador = document.getElementById("buscador");
let boton = document.getElementById("boton");

let totalBuy = document.createElement("div"); // Crear el elemento una sola vez
totalBuy.style.display = "block";


 
  ///////////////////////////// filtro productos 
 
  function abarcativa() {
    let productos = [
      {
        id: 1,
        imagen: "rodillo-de-jade.jpg",
        nombre: "rodillo de jade",
        unidades: 1,
        material: "cuarzo",
        precio: 1500,
        colores: ["rosa", "magenta", "violeta"]
      },
      {
        id: 2,
        imagen: "masajeador.jpg",
        nombre: "masajedora eléctrico",
        unidades: 1,
        material: "cuarzo",
        precio: 1650,
        colores: ["magenta", "verde"]
      },
      {
        id: 3,
        imagen: "gua-sha.jpg",
        nombre: "gua sha",
        unidades: 1,
        material: "cuarzo",
        precio: 999,
        colores: ["amarillo", "verde", "magenta"]
      },
      {
        id: 4,
        imagen:"siliconas.jpg",
        nombre: "bolsas de masaje",
        unidades: 1,
        material: "silicona",
        precio: 1700,
        colores: ["amarillo", "magenta", "verde"]
      }
    ];
  
    boton.addEventListener("click", () => filtroDeProductos(productos, buscador));
  
    buscarProductos(productos);
  }
  
  abarcativa();
  
  
  function filtroDeProductos(productos, input) {
    let filtroNombre = productos.filter(producto => producto.nombre.toLowerCase().includes(input.value.toLowerCase()));
    buscarProductos(filtroNombre);
  
  
  }
  


let carrito = [];

////////////////////////////////////////////////////Función para cargar el carrito desde el LocalStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
  if (carritoGuardado) {
    carrito = carritoGuardado;
  }
}

///////////////////////////////////////////// Función para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

//////////////////////////////////////////////////////suma de compras  de carrito  ////REDUCE
function cardTotal() {
  const total = carrito.reduce((acumulador, el) => acumulador + el.precio * el.unidades, 0);
  totalBuy.innerHTML = `Total a pagar: $${total}`; // Actualizar el contenido

  // Mostrar el elemento solo si hay algo en el carrito
  if (total > 0) {
    totalBuy.style.display = "block";
  } else {
    totalBuy.style.display = "none";
  }
}


let finalizarCompra = document.createElement("button");
finalizarCompra.innerText = "Finalizar compra✔️";

finalizarCompra.addEventListener("click", () => {
  if (carrito.length > 0) {
    lanzarAlerta("¡Gracias por tu compra!");
    carrito.length = 0;
    cardTotal();
    localStorage.removeItem("carrito");
  } else {
    lanzarAlerta("Todavía no tienes nada en el carrito");
  }
});

////////////////////////////////////////////////////////////////////////////////Cards
function buscarProductos(productoBuscar) {
  shopYog.innerHTML = ""; // Borra el contenido 
  productoBuscar.forEach((product) => {
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
      <img src=./imagenes/${product.imagen} />
      <h3>${product.nombre}</h3>
      <p>Material: ${product.material}</p>
      <p>Precio:$ ${product.precio} </p>
      <p>Colores disponibles: ${product.colores.join(', ')} </p>
     `;

    let comprar = document.createElement("button"); //////////boton de compra
    comprar.innerText = "Comprar";

    contenido.appendChild(comprar);
    shopYog.appendChild(contenido);

    // Evento comprar//////////////////////////////////////////////////////////////////////////
    comprar.addEventListener("click", () => {
      const repetir = carrito.some((repetirproducto) => repetirproducto.id === product.id);

      if (repetir) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.unidades++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          imagen: product.imagen,
          nombre: product.nombre,
          unidades: product.unidades,
          material: product.material,
          precio: product.precio,
          colores: product.colores
        });

        cardTotal(); // función para actualizar el total del carrito
        guardarCarritoEnLocalStorage();
      }

      lanzarAlerta("Tu producto ya esta en el carrito")
    });
  });
}

////////////////////////////////////////// Evento para ver el carrito VER CARRITO
verCarrito.addEventListener("click", () => {
  seccionContainer.innerHTML = "";
  const cPrincipal = document.createElement("div");
  cPrincipal.className = "seccion-Carrito";
  cPrincipal.innerHTML = `
    <h1 class="seccion-carrito-title">Carrito</h1>
  `;
  seccionContainer.appendChild(cPrincipal);

  ///////////////////////////////////// Botón para cerrar el carrito
  const buttonCarrito = document.createElement("button");
  buttonCarrito.innerText = "CERRAR";
  buttonCarrito.className = "seccion-header";

  buttonCarrito.addEventListener("click", () => {
    seccionContainer.style.display = "none";
    guardarCarritoEnLocalStorage();
  });

  cPrincipal.appendChild(buttonCarrito);




  //////////////////// Recorrer y mostrar los productos en el carrito 
  carrito.forEach((product, index) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "carrito";
    carritoContent.innerHTML = `
      <img src=./imagenes/${product.imagen} /> 
      <h3>${product.nombre}</h3>
      <p>Cantidad: ${product.unidades}</p>
      <p>Material: ${product.material}</p>
      <p>Precio: ${product.precio} </p>
      <p>total por unidades : ${product.unidades * product.precio} </p>
      <p>Colores: ${product.colores.join(', ')} </p>
    `;

    ////////////////////////////////////////////////// finalizar  compra ////////////////////////////


    let eliminarProducto = document.createElement("span");
    eliminarProducto.innerText = "❌";
    eliminarProducto.className = "eliminar";

    eliminarProducto.addEventListener("click", () => {
      carrito.splice(index, 1);
      carritoContent.remove();
      cardTotal(); // Llama a la función para actualizar el total del carrito
      guardarCarritoEnLocalStorage();
    });

    carritoContent.appendChild(eliminarProducto);
    cPrincipal.appendChild(carritoContent);
    seccionContainer.appendChild(totalBuy)
    seccionContainer.appendChild(finalizarCompra)
  });

  seccionContainer.style.display = "block";
});

cargarCarritoDesdeLocalStorage();
cardTotal();

/////////////////////////////////////Alert
function lanzarAlerta(text) {
  Toastify({
    text: text,
    duration: 1000,
    position: "center",

  }).showToast();
};

