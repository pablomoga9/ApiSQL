const express = require('express')
const emoji = require('emoji-whale');
const cowsay = require('cowsay2');
const owl = require('cowsay2/cows/owl');
const whale = require('cowsay2/cows/whale');
const manage404 = require('./middlewares/error404');
const checkApiKey = require('./middlewares/auth_API_KEY')


// Rutas de productos
const productsRoutes = require('./routes/productsRoutes');
const productsApiRoutes = require('./routes/productsApiRoutes');
const entriesApiRoutes = require('./routes/entriesApiRoutes')
const authorsApiRoutes = require('./routes/authorsApiRoutes')


const calc = require('./utils/calculator');

const app = express()
const port = 3000

// View engine
app.set('view engine', 'pug');
app.set('views','./views');

//Permite leer el body recibido en una petición
app.use(express.json());


// Router de productos

app.use("/products",productsRoutes);
app.use("/api/products", productsApiRoutes);
app.use("/api/", entriesApiRoutes);
app.use("/api/",authorsApiRoutes);










//---------------------------------------------------------
app.get('/', (req, res) => {
    console.log(emoji);
    console.log(cowsay.say('Hola que tal?', { cow: owl }));
    //res.send('Hola desde mi primer servidor :) !!!!'+emoji)
    let msj = 'Hola desde mi primer servidor :) !!!!'+emoji;
    // res.render("my_view.pug",{section:"Home",msj});
    res.render("my_view",{section:"Home",msj});
})




app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    let msj = "";
    if (req.params.name) { // si hay parámetro name
        msj = 'Aquí te envío a:' + req.params.name;
    } else {
        msj = 'Aquí te envío a todos los pokemon del planeta';
    }
    console.log(cowsay.say(msj, { cow: owl })); // Imprime el buho con msj
    //res.send(msj+" "+emoji);
    res.render("my_view",{section:"Pokemon",msj});
})

app.get('/perritos', (req, res) => {
    let msj = "¿cuánto son 2+2?: "+calc.add(2,2);
    console.log(cowsay.say(msj, { cow: owl }));
    let msj2 = 'Aquí te enviaría mis perritos y...'+msj+" "+emoji;
    // res.send('Aquí te enviaría mis perritos y...'+msj+" "+emoji)
    res.render("my_view",{section:"Perritos",msj:msj2});
})

app.use(manage404);



app.listen(port, () => {
    console.log(cowsay.say(`Mi servidor funciona en http://localhost:${port}`, { cow: whale }));
})