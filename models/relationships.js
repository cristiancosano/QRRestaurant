const { Rating } = require("./Rating");
const { Restaurant } = require("./Restaurant");
const { User } = require("./User");
const { Sequelize, Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require("./SequelizeManager");


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


async function migrateSeed(){
    await Rating.drop();
    await Restaurant.drop();
    await User.drop();
    await sequelize.sync()

    User.create({dni: '12345678A', email: 'pacoalmenara@gmail.com', password: 'password1'})
    User.create({dni: '12345678B', email: 'stickyamp1@gmail.com', password: 'password2'})
    User.create({dni: '12345678C', email: 'cristiancosano@icloud.com', password: 'password3'})
    User.create({dni: '12345678D', email: 'jmgil@gmail.com', password: 'password4'})
    User.create({dni: '12345678E', email: 'antoniolrj4@gmail.com', password: 'password5'})

    Restaurant.create({name: 'Casa Pepe', address: 'Rabanales, s/n', capacity: 22, city: 'Cordoba', description: 'Un lugar muy bonito', menu: 'averroes.pdf', category: 'Bar rancio', photos: '["averroes.jpg"]', userDni: '12345678A'});
    Restaurant.create({name: 'Casa Juan', address: 'Arcangel, s/n', capacity: 32, city: 'Sevilla', description: 'Un lugar muy feo', menu: 'averroes.pdf', category: 'Bar feo', photos: '["averroes.jpg"]', userDni: '12345678B'});
    Restaurant.create({name: 'Casa Miguel', address: 'El Tablero, s/n', capacity: 42, city: 'Granada', description: 'Un lugar muy rancio', menu: 'averroes.pdf', category: 'Bar de pijos', photos: '["averroes.jpg"]', userDni: '12345678C'});


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
