const { Restaurant } = require('../models/Restaurant')

var total=5;
var ok=0;
var error=0;

//Pruebas de consultas simples

//Crear
async function testRestaurantDBCreate(){
    await Restaurant.create({ 
        name:'Nombre', 
        address:'Dirección', 
        capacity:'5', 
        freeSeats:'5', 
        city:'Ciudad', 
        description:'Descripción', 
        menu:'averroes.pdf',
        photos:['averroes.jpg'],
        userDni:'11111111test',
        foodTypeId:'1'
    });
    return;
};

//Consultar (individual)
async function testRestaurantDBQueryByName(){
    let restaurant = Restaurant.findOne({ where:{ name:'Nombre'}})
    return restaurant;
};

async function testRestaurantDBQueryByLocation(){
    let usuario = Restaurant.findOne({ where:{ city:'Ciudad'}})
    return usuario;
};

//Editar restaurante
async function testRestaurantDBUpdate(){
    var restaurant = await Restaurant.findOne({where: {name: 'Nombre'}});
    restaurant.update({
        name:'Nombre Nuevo', 
        address:'Dirección Nueva', 
        capacity:'10', 
        city:'Ciudad Nueva', 
        description:'Descripción Nueva', 
        userDni:'11111111test',
        foodTypeId:'1'
    });
    return;
};

//Eliminar
async function testRestaurantDBDelete(){
    let restaurant = await Restaurant.findOne({where: {name: 'Nombre'}});
    await restaurant.destroy({where: {name: 'Nombre'}});
    return;
};

async function testRestaurant(){
    console.log("TEST [RESTAURANTE]\n");

    console.log("TEST 1 [CREAR RESTAURANTE]");
    console.log("Creando restaurante ...");
    await testRestaurantDBCreate();
    console.log("OK - Restaurante creado correctamente\n");

    console.log("TEST 2 [CONSULTAR RESTAURANTE POR NOMBRE]");
    console.log("Consultando restaurante por nombre...");
    let restaurantName = await testRestaurantDBQueryByName();
    if(restaurantName.name == 'Nombre'){
        console.log("OK - Restaurante encontrado correctamente\n");
        ok=2;
    }else{
        console.log("ERROR - Restaurante no encontrado\n");
        error=2;
    }

    console.log("TEST 3 [CONSULTAR RESTAURANTE POR LOCALIZACIÓN]");
    console.log("Consultando restaurante por localización ...");
    let restaurantLocation = await testRestaurantDBQueryByLocation();
    if(restaurantLocation.city == 'Ciudad'){
        console.log("OK - Restaurante encontrado correctamente\n");
        ok++;
    }else{
        console.log("ERROR - Restaurante no encontrado\n");
        error++;
    }

    //Para probar la función de actualizar, descomentar y comentar la función de eliminar
    //Borrar manualmente de la base de datos el restaurante actualizado

    /*
    console.log("TEST 4 [ACTUALIZAR RESTAURANTE]");
    console.log("Actualizando restaurante ...");
    await testRestaurantDBUpdate();
    ok++;
    console.log("OK - Restaurante actualizado correctamente\n");
    */

    console.log("TEST 5 [ELIMINAR RESTAURANTE]");
    console.log("Eliminando restaurante ...");
    await testRestaurantDBDelete();
    ok++;
    console.log("OK - Restaurante eliminado correctamente\n");

    return;
};

//Llamadas a los tests
async function tests(){
    console.log("TESTS");
    console.log("Realizando tests ...\n");
    
    await testRestaurant();
    console.log("Resultados TESTS [RESTAURANTE]");
    console.log(total ," TOTAL - TESTS [RESTAURANTE]")
    console.log(ok, " OK - TESTS [RESTAURANTE]");
    console.log(error, " ERROR - TESTS [RESTAURANTE]\n");

    console.log("ALERTA - Consultar el código para probar la función de actualizar\n");
};

tests();