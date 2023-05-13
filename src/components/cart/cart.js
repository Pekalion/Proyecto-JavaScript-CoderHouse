let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

const vaciarCarrito = document.getElementById("btn-vaciar-carrito");

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        validarProductoRepetido(e.target.id)
        Toastify({
            text: '¡El producto fue agregado con éxito!',
            duration: 3000,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, #212529, rgb(216, 49, 80))",
            }

        }).showToast()
    }
});

// Funcion para vaciar el carrito con un solo click

vaciarCarrito.addEventListener("click", () => {
    while (localStorage.length > 0) {
        localStorage.removeItem(localStorage.key(0));
    }
    if (carrito.length===0) {
        Swal.fire ({
            icon:"error",
            text:"El carrito ya esta vacio",
            showConfirmButton: false,
            timer: 2000
        })
    } else {
    carrito.length = 0
    Swal.fire({
        icon:"success",
        text:"Carrito vaciado con exito",
        showConfirmButton: false,
        timer: 2000
    })
    }
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
});

const validarProductoRepetido = (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId);

    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        guardarCarritoStorage(carrito);
        actualizarTotalesCarrito(carrito);
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito);
    }
};

// Funcion para mostrar los productos dentro del carrito

const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `
        <img src=${producto.img} class="imagen-carrito">
        <p>${producto.nombre}</p>
        <p>Precio:$ ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div);
};

// Funcion para eliminar de a un(1) tipo de producto dentro del carrito

const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id == productoId);
    carrito.splice(productoIndex, 1);
    actualizarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
};

const actualizarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML += `
            <img src=${producto.img} class="imagen-carrito">
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div);
    });
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
};

// Funcion para calcular precio y cantidad total del carrito

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
    guardarCarritoStorage(carrito);
};

// Funcion para mostrar lo calculado en la funcion actualizarTotalesCarrito

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');
    console.log(contadorCarrito, precioTotal)

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};