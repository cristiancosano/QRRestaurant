const { Rating } = require("./Rating");
const { Restaurant } = require("./Restaurant");
const { User } = require("./User");
const { Sequelize, Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require("./SequelizeManager");
const { FoodType } = require("./FoodType");
const { History } = require("./History");


const sequelize = SequelizeManager.getInstance()

Restaurant.hasMany(Rating, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Rating.belongsTo(Restaurant);
User.hasMany(Rating, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.hasMany(Restaurant, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Restaurant.belongsTo(User);
Rating.belongsTo(User);

FoodType.hasMany(Restaurant);
Restaurant.belongsTo(FoodType);

Restaurant.hasMany(History);
History.belongsTo(Restaurant)

User.hasMany(History)
History.belongsTo(User)


async function migrateSeed(){
    await History.drop();
    await Rating.drop();
    await Restaurant.drop();
    await FoodType.drop();
    await User.drop();
    await sequelize.sync()

    //Prueba de creación de usuarios

    /*
    let j=0;
    for(let i=0; i<100000; i++){
        j+1;
        User.create({dni: j+1, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+2, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+3, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+4, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+5, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+6, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+7, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+8, email: 'pacoalmenara@gmail.com', password: 'password1'})
        User.create({dni: j+9, email: 'pacoalmenara@gmail.com', password: 'password1'})
    }
    */

    User.create({dni: '12345678A', email: 'pacoalmenara@gmail.com', password: 'password1'})
    User.create({dni: '12345678B', email: 'stickyamp1@gmail.com', password: 'password2'})
    User.create({dni: '12345678C', email: 'cristiancosano@icloud.com', password: 'password3', admin: true})
    User.create({dni: '12345678D', email: 'jmgil@gmail.com', password: 'password4', admin: true})
    User.create({dni: '12345678E', email: 'antoniolrj4@gmail.com', password: 'password5'})

    FoodType.create({name: 'Asiática'});
    FoodType.create({name: 'Brasileña'});
    FoodType.create({name: 'Mediterránea'});
    FoodType.create({name: 'Bar de tapas'});
    FoodType.create({name: 'Española'});
    FoodType.create({name: 'Vanguardista'});

    //Prueba de creación de usuarios

    /*
    for(let i=0; i<100000; i++){
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
        Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
    }
    */

    Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, freeSeats:22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678A', foodTypeId: 1});
    Restaurant.create({name: 'Casa Juan', address: 'Arcangel, s/n', capacity: 32, freeSeats:32, city: 'Sevilla', description: 'Un lugar muy feo', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678B', foodTypeId: 2});
    Restaurant.create({name: 'Casa Miguel', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678C', foodTypeId: 5});
    Restaurant.create({name: 'Casa Gil', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678D', foodTypeId: 5});
    Restaurant.create({name: 'Casa JM', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678D', foodTypeId: 5});
    Restaurant.create({name: 'Casa Paco', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678D', foodTypeId: 5});

    Rating.create({rating: 1, restaurantId: 1, userDni: '12345678A'})
    Rating.create({rating: 5, restaurantId: 1, userDni: '12345678B'})
    Rating.create({rating: 3, restaurantId: 1, userDni: '12345678C'})
    Rating.create({rating: 2, restaurantId: 1, userDni: '12345678D'})
    Rating.create({rating: 5, restaurantId: 1, userDni: '12345678E'})


    Rating.create({rating: 5, restaurantId: 2, userDni: '12345678A'})
    Rating.create({rating: 4, restaurantId: 2, userDni: '12345678B'})
    Rating.create({rating: 3, restaurantId: 2, userDni: '12345678C'})
    Rating.create({rating: 2, restaurantId: 2, userDni: '12345678D'})
    Rating.create({rating: 1, restaurantId: 2, userDni: '12345678E'})


    Rating.create({rating: 5, restaurantId: 3, userDni: '12345678A'})
    Rating.create({rating: 5, restaurantId: 3, userDni: '12345678B'})
    Rating.create({rating: 5, restaurantId: 3, userDni: '12345678C'})
    Rating.create({rating: 4, restaurantId: 3, userDni: '12345678D'})
    Rating.create({rating: 2, restaurantId: 3, userDni: '12345678E'})


};


(async function(){
    //await migrateSeed() //OJO: Si se descomenta esto borra todos los datos y mete los que incluye por defecto la función
})();
