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
    await sequelize.sync();

    User.create({dni: '12345678A', email: 'pacoalmenara@gmail.com', password: 'password1'})
    User.create({dni: '12345678B', email: 'stickyamp1@gmail.com', password: 'password2'})
    User.create({dni: '12345678C', email: 'cristiancosano@icloud.com', password: 'password3', admin: true})
    User.create({dni: '12345678D', email: 'jmgil@gmail.com', password: 'password4', admin: true})
    User.create({dni: '12345678E', email: 'antoniolrj4@gmail.com', password: 'password5'})
    User.create({dni: '12345678F', email: 'test@test.com', password: 'password'})

    FoodType.create({name: 'Asiática'});
    FoodType.create({name: 'Brasileña'});
    FoodType.create({name: 'Mediterránea'});
    FoodType.create({name: 'Bar de tapas'});
    FoodType.create({name: 'Española'});
    FoodType.create({name: 'Vanguardista'});

    Restaurant.create({name: 'Casa Pepe de la Judería', address: 'Calle Romero, 1', capacity: 22, freeSeats:22, city: 'Córdoba', description: 'Bienvenidos a Casa Pepe de la Judería, el restaurante ideal para sumergirse en la riqueza culinaria cordobesa', menu: 'Pepe_Juderia_carta.pdf', photos: ['Pepe_juderia_logo.jpg'], userDni: '12345678A', foodTypeId: 4});
    Restaurant.create({name: 'Moriles Ribera', address: 'Paseo de la Ribera, 6', capacity: 32, freeSeats:32, city: 'Córdoba', description: 'Un lugar muy feo', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678B', foodTypeId: 2});
    Restaurant.create({name: 'Casa Miguel', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678C', foodTypeId: 5});
    Restaurant.create({name: 'Casa Gil', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678D', foodTypeId: 4});
    Restaurant.create({name: 'Casa JM', address: 'El Tablero, s/n', capacity: 42, freeSeats:42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', photos: ['averroes.jpg'], userDni: '12345678D', foodTypeId: 3});
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
