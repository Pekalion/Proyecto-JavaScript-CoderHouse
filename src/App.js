// Funcion para mostrar productos dentro del HTML, conectado a nuestro stock, obteniendo información de sus elementos y sus valores para completar información esencial para de los productos

const pintarProductos = async () => {
  const contenedor = document.getElementById("producto-contenedor");

  const productos = await homeController()

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                      </div>
                      <div class="card-content">
                          <p>${producto.desc}</p>
                          <p>$ ${producto.precio}</p>
                      </div>
                      `
    contenedor.appendChild(div);
  });
};