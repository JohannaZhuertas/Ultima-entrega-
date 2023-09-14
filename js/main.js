let shopYog = document.getElementById("shopYog");
const verCarrito = document.getElementById("verCarrito");
const seccionContainer = document.getElementById("seccionContainer");
let buscador = document.getElementById("buscador");
let boton = document.getElementById("boton");

function abarcativa() {
  let productos = [
    {
      id: 1,
      imagen: "rodillo-de-jade.jpg",
      nombre: "rodillo de jade",
      unidades: 2,
      material: "cuarzo",
      precio: 1500,
      colores: ["rosa", "magenta", "violeta"]
    },
    {
      id: 2,
      imagen: "masajedor.jpg",
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
      imagen: "siliconas.jpg",
      nombre: "bolsas de masaje",
      unidades: 8,
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

// Función para cargar el carrito desde el LocalStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
  if (carritoGuardado) {
    carrito = carritoGuardado;
  }
}

// Función para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cardTotal() {
  const total = carrito.reduce((acumulador, el) => acumulador + el.precio, 0);
  let totalBuy = document.getElementById("totalBuy");
  totalBuy.innerText = `Total a pagar: $${total}`;
}

// Cards

function buscarProductos(productoBuscar) {
  shopYog.innerHTML = ""; // Borra el contenido 
  productoBuscar.forEach((product) => {
    let contenido = document.createElement("div");
    contenido.className = "card";
    contenido.innerHTML = `
      <img src=./imagenes/${product.imagen} />
      <h3>${product.nombre}</h3>
      <p>Unidades disponibles: ${product.unidades}</p>
      <p>Material: ${product.material}</p>
      <p>Precio:$ ${product.precio} </p>
      <p>Colores disponibles: ${product.colores.join(', ')} </p>
     `;

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";

    contenido.append(comprar);
    shopYog.appendChild(contenido);

    // Evento comprar
    comprar.addEventListener("click", () => {
      if (product.unidades > 0) {
        carrito.push({
          nombre: product.nombre,
          unidades: 1,
          material: product.material,
          precio: product.precio,
          colores: product.colores
        });
        product.unidades -= 1;
        cardTotal(); // función para actualizar el total del carrito
        guardarCarritoEnLocalStorage();
      } else {
        alert("No hay unidades disponibles");
      }
    });
  });
}

// Evento para ver el carrito
verCarrito.addEventListener("click", () => {
  const cPrincipal = document.createElement("div");
  cPrincipal.className = "seccion-Carrito";
  cPrincipal.innerHTML = `
      <h1 class="seccion-carrito-title">Carrito</h1>
    `;
  seccionContainer.appendChild(cPrincipal);

  // Botón para cerrar el carrito
  const buttonCarrito = document.createElement("button");
  buttonCarrito.innerText = "Cerrar";
  buttonCarrito.className = "seccion-header";

  buttonCarrito.addEventListener("click", () => {
    seccionContainer.style.display = "none";
    guardarCarritoEnLocalStorage();
  });

  cPrincipal.appendChild(buttonCarrito);

  // Recorrer y mostrar los productos en el carrito
  carrito.forEach((product, index) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "carrito";
    carritoContent.innerHTML = `
      <h3>${product.nombre}</h3>
      <p>Cantidad: ${product.unidades}</p>
      <p>Material: ${product.material}</p>
      <p>Precio: ${product.precio} </p>
      <p>Colores: ${product.colores.join(', ')} </p>
    `;

    let eliminarProducto = document.createElement("span");
    eliminarProducto.innerText = "❌";
    eliminarProducto.className = "eliminarP";

    eliminarProducto.addEventListener("click", () => {
      carrito.splice(index, 1);
      carritoContent.remove();
      cardTotal(); // Llama a la función para actualizar el total del carrito
      guardarCarritoEnLocalStorage();
    });

    carritoContent.appendChild(eliminarProducto);
    cPrincipal.appendChild(carritoContent);
  });

  // Mostrar el total a pagar
  let totalBuy = document.createElement("div");
  totalBuy.id = "totalBuy";
  totalBuy.className = "total";
  cardTotal(); // Llama a la función para mostrar el total al abrir el carrito
  cPrincipal.appendChild(totalBuy);

  seccionContainer.style.display = "block";
});

cargarCarritoDesdeLocalStorage();

cardTotal(); // Llama a la función para mostrar el total al cargar la página
