class Producto {
    constructor(nombre, precio, atributos) {
        this.nombre = nombre;
        this.precio = precio;
        this.atributos = atributos;
        this.cantidad = 0;
    }
}

class Categoria {
    constructor(nombre, productos) {
        this.nombre = nombre;
        this.productos = productos;
    }

    listarProductos() {
        return this.productos.map((producto, index) => 
            `${index + 1}. ${producto.nombre} - $${producto.precio} (${producto.atributos.join(', ')})`
        ).join('\n');
    }
}

const carrito = [];
const categorias = [
    new Categoria('Ropa', [
        new Producto('Camisa', 20000, ['Color: Azul', 'Talla: M']),
        new Producto('Pantalón', 30000, ['Color: Negro', 'Talla: 32']),
        new Producto('Zapatos', 50000, ['Color: Marrón', 'Talla: 42']),
    ]),
    new Categoria('Hogar', [
        new Producto('Mesa', 100000, ['Material: Madera', 'Dimensiones: 120x60cm']),
        new Producto('Silla', 50000, ['Material: Plástico', 'Color: Blanco']),
        new Producto('Lámpara', 30000, ['Material: Metal', 'Color: Negro']),
    ]),
    new Categoria('Tecnología', [
        new Producto('Teclado', 25000, ['Marca: Logitech']),
        new Producto('Mouse', 15000, ['Marca: Razer']),
        new Producto('Pantalla', 150000, ['Marca: Samsung']),
    ]),
    new Categoria('Belleza', [
        new Producto('Perfume', 75000, ['Marca: Chanel']),
        new Producto('Crema', 25000, ['Marca: Nivea']),
        new Producto('Maquillaje', 40000, ['Marca: Maybelline']),
    ])
];

function verMenuPrincipal() {
    document.getElementById('output').innerHTML = `
        <h2>++ BIENVENIDO A LA TIENDA MALL-ALL ++</h2>
        <button onclick="mostrarMenuCategorias()">Comprar Producto</button>
        <button onclick="verCarrito()">Ver Carrito</button>
        <button onclick="salir()">Salir</button>
    `;
}

function mostrarMenuCategorias() {
    const opcionesCategorias = categorias.map((categoria, index) => 
        `<button onclick="productoSeleccionar(${index})">${categoria.nombre}</button>`
    ).join('<br>');

    document.getElementById('output').innerHTML = `
        <h2>++ CATEGORÍAS DISPONIBLES ++</h2>
        ${opcionesCategorias}
    `;
}

function productoSeleccionar(index) {
    const categoriaSeleccionada = categorias[index];
    const productosCategoria = categoriaSeleccionada.listarProductos().split('\n').map((producto, i) => 
        `<button onclick="comprarProducto(${index}, ${i})">${producto}</button>`
    ).join('<br>');

    document.getElementById('output').innerHTML = `
        <h2>+++ PRODUCTOS DISPONIBLES EN ${categoriaSeleccionada.nombre.toUpperCase()} +++</h2>
        ${productosCategoria}
    `;
}

function comprarProducto(categoriaIndex, productoIndex) {
    const producto = categorias[categoriaIndex].productos[productoIndex];
    document.getElementById('output').innerHTML = `
        <h2>Comprar ${producto.nombre}</h2>
        <label>¿Cuántas unidades deseas comprar?</label>
        <input type="number" id="cantidad" min="1">
        <button onclick="confirmarCompra(${categoriaIndex}, ${productoIndex})">Confirmar</button>
        <button onclick="verMenuPrincipal()">Cancelar</button>
    `;
}

function confirmarCompra(categoriaIndex, productoIndex) {
    const producto = categorias[categoriaIndex].productos[productoIndex];
    const cantidad = parseInt(document.getElementById('cantidad').value);

    if (cantidad > 0) {
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad });
        }
        document.getElementById('output').innerHTML = `
            <h2>Producto añadido al carrito</h2>
            <button onclick="mostrarMenuCategorias()">Comprar más</button>
            <button onclick="verMenuPrincipal()">Ir al menú principal</button>
        `;
    } else {
        document.getElementById('output').innerHTML = `
            <h2>Cantidad no válida</h2>
            <button onclick="comprarProducto(${categoriaIndex}, ${productoIndex})">Intentar de nuevo</button>
        `;
    }
}

function verCarrito() {
    if (carrito.length === 0) {
        document.getElementById('output').innerHTML = `
            <h2>El carrito está vacío.</h2>
            <button onclick="verMenuPrincipal()">Ir al menú principal</button>
        `;
        return;
    }

    const listaProductosCarrito = carrito.map((producto, index) => 
        `${index + 1}. ${producto.nombre} - $${producto.precio} (${producto.atributos.join(', ')}) - Cantidad: ${producto.cantidad}`
    ).join('<br>');

    let totalCarrito = carrito.reduce((sumaTotal, producto) => sumaTotal + (producto.precio * producto.cantidad), 0);

    document.getElementById('output').innerHTML = `
        <h2>+++ CARRITO DE COMPRAS +++</h2>
        ${listaProductosCarrito}
        <p>Total: $${totalCarrito}</p>
        <label>¿Tienes un código de descuento?</label>
        <input type="checkbox" id="codigoDescuento">
        <button onclick="confirmarCompraFinal(${totalCarrito})">Proceder con el pago</button>
        <button onclick="verMenuPrincipal()">Seguir comprando</button>
    `;
}

function confirmarCompraFinal(totalCarrito) {
    const tieneCodigoDescuento = document.getElementById('codigoDescuento').checked;
    totalCarrito = tieneCodigoDescuento ? totalCarrito * 0.9 : totalCarrito;

    document.getElementById('output').innerHTML = `
        <h2>Compra finalizada</h2>
        <p>Total: $${totalCarrito}</p>
        <button onclick="finalizarCompra()">Finalizar</button>
    `;
}

function finalizarCompra() {
    carrito.length = 0;
    document.getElementById('output').innerHTML = `
        <h2>Gracias por tu compra. Vuelve pronto.</h2>
        <button onclick="verMenuPrincipal()">Ir al menú principal</button>
    `;
}

function salir() {
    document.getElementById('output').innerHTML = `
        <h2>¡Nos vemos pronto amig@! Gracias por tu visita</h2>
    `;
}

document.addEventListener('DOMContentLoaded', verMenuPrincipal);
