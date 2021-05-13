
//Prueba de creación de usuarios
async function testUserDBCreate(){
    for(let i=0; i<1000; i++){
        await User.create({dni: i, email: 'pacoalmenara@gmail.com', password: 'password1'});
    }
    return;
    };

async function testUserDBTime(){
    let d1= new Date();
    console.log(d1);
    await testUserDBCreate();
    let d2=new Date();
    console.log(d2);
    console.log("Tiempo tomado para insertar 1000 usuarios simultanes = ",(d2-d1)/1000)," segundos";
};

testUserDBTime();