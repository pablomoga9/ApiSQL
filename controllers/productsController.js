const fetch = require('node-fetch');

const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.status(200).render('products', { "products": [products] }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).render('products', { "products": [] }); // Pinta datos en el pug
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.status(200).render('products', { products }); // Pinta datos en el pug
        }
        catch (error) {
            res.status(404).render('products', { products });
            console.log(`ERROR: ${error.stack}`);
        }
    }
}
const createProduct = async (req, res) => {
    console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB

    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api",answer);

    res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
}

const deleteProduct = async (req,res)=>{
    const msj ="Has enviado un DELETE para borrar product";
    console.log(msj);
    res.send(msj);
}
module.exports = {
    getProducts,
    createProduct,
    deleteProduct
    //editProduct,
    
}














