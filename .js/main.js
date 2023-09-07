let shopYog = document.getElementById("shopYog");
const verCarrito = document.getElementById("verCarrito");
const seccionContainer = document.getElementById("seccionContainer");

let productos = [
  {
    nombre: "rodillo de jade",
    unidades: 2,
    material: "cuarzo",
    precio: 1500,
    colores: ["rosa", "magenta", "violeta"]
  },
  {
    nombre: "masajedora eléctrico",
    unidades: 1,
    material: "cuarzo",
    precio: 1650,
    colores: ["magenta", "verde"]
  },
  {
    nombre: "gua sha",
    unidades: 1,
    material: "cuarzo",
    precio: 999,
    colores: ["amarillo", "verde", "magenta"]
  },
  {
    nombre: "bolsas de masaje",
    unidades: 8,
    material: "silicona",
    precio: 1700,
    colores: ["amarillo", "magenta", "verde"]
  }
];

let carrito = [];

function updateCartTotal() {
  const total = carrito.reduce((acumulador, el) => acumulador + el.precio, 0);
  let totalBuy = document.getElementById("totalBuy");
  totalBuy.innerText = `Total a pagar: ${total} $`;
}
// Cards

productos.forEach((product) => {
   let contenido = document.createElement("div");
  contenido.className = "card";
  contenido.innerHTML = `
      <h3>${product.nombre}</h3>
      <p>Unidades disponibles: ${product.unidades}</p>
      <p>Material: ${product.material}</p>
      <p>Precio: ${product.precio} $</p>
      <p>Colores disponibles: ${product.colores.join(', ')} </p>
    `;

  let comprar = document.createElement("button");
  comprar.innerText = "Comprar";

  contenido.appendChild(comprar);
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
      updateCartTotal();
    } else {
      alert("No hay unidades disponibles");
    }
  });
});

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
  });

  cPrincipal.appendChild(buttonCarrito);

  // Recorrer y mostrar los productos en el carrito
  carrito.forEach((product, index) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "carito-estilos";
    carritoContent.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>Cantidad: ${product.unidades}</p>
        <p>Material: ${product.material}</p>
        <p>Precio: ${product.precio} $</p>
        <p>Colores: ${product.colores.join(', ')} </p>
      `;

    let eliminarProducto = document.createElement("span");
    eliminarProducto.innerText = "❌";
    eliminarProducto.className = "eliminarP";

    eliminarProducto.addEventListener("click", () => {
      carrito.splice(index, 1);
      carritoContent.remove();
      updateCartTotal();
    });

    carritoContent.appendChild(eliminarProducto);
    cPrincipal.appendChild(carritoContent);
  });

  // Mostrar el total a pagar
  let totalBuy = document.createElement("div");
  totalBuy.id = "totalBuy";
  totalBuy.className = "total-content";
  updateCartTotal();
  cPrincipal.appendChild(totalBuy);

  seccionContainer.style.display = "block";
});
