const { User } = require('../models/User')

var totalTests=2;
//User
var totalUserTests=2;
var okUserTests=0;
var errorUserTests=0;

//Pruebas de consultas simples

// 1) USUARIOS
async function testUserDBCreate(){
    await User.create({ dni:'11111111test', email:'prueba@gmail.com', password:'password'});
    return;
};

async function testUserDBQueryByDNI(){
    let usuario = User.findOne({ where:{ dni:'11111111test'}})
    return usuario;
};

async function deleteTestUser(user){
    await user.destroy({where: {id:'11111111test'}});
    return;
};


async function testUser(){
    console.log("TEST [USUARIO]\n");

    console.log("TEST 1 [CREAR USUARIO]");
    console.log("Creando usuario ...");
    await testUserDBCreate();
    console.log("OK - Usuario creado correctamente\n");
    
    console.log("TEST 2 [CONSULTAR USUARIO]");
    console.log("Consultando usuario ...");
    let user = await testUserDBQueryByDNI();
    if(user.dni == '11111111test'){
        console.log("OK - Usuario encontrado correctamente\n");
        okUserTests=2;
    }else{
        console.log("ERROR - Usuario no encontrado\n");
        errorUserTests=2;
    }

    console.log("Eliminando usuario de prueba ...");
    await deleteTestUser(user);
    console.log("Usuario de prueba eliminado\n");
    return;
};

async function tests(){
    console.log("TESTS");
    console.log("Realizando tests ...\n");
    
    await testUser();
    console.log("Resultados TESTS [USUARIO]");
    console.log(totalUserTests ," TOTAL - TESTS [USUARIO]")
    console.log(okUserTests, " OK - TESTS [USUARIO]");
    console.log(errorUserTests, " ERROR - TESTS [USUARIO]\n");
};

tests();

// 2) Consulta de usuario

/*
async function testUserDBQueryByDNI(){
    console.log("Consultando usuario ...");
    let user = await testUserDBQueryByDNI1();
    
};

testUserDBQueryByDNI();
*/


//Pruebas de consultas masivas

//Prueba de creación de 1000 usuarios simultaneos
/*
async function testUserDBCreate1000(){
    for(let i=0; i<1000; i++){
        await User.create({dni: i, email: 'pacoalmenara@gmail.com', password: 'password1'});
    }
    return;
    };

async function testUserDBTime(){
    let d1= new Date();
    console.log(d1);
    await testUserDBCreate1000();
    let d2=new Date();
    console.log(d2);
    console.log("Tiempo tomado para insertar 1000 usuarios simultanes = ",(d2-d1)/1000)," segundos";
};

testUserDBTime();
*/