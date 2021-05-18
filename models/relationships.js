const { Rating } = require("./Rating");
const { Restaurant } = require("./Restaurant");
const { User } = require("./User");
const { Sequelize, Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require("./SequelizeManager");
const { FoodType } = require("./FoodType");
const { History } = require("./History");
const bcrypt = require('bcrypt');


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

const saltRounds = 10;


async function migrateSeed(){
    await History.drop();
    await Rating.drop();
    await Restaurant.drop();
    await FoodType.drop();
    await User.drop();
    await sequelize.sync();

    bcrypt.hash('password', saltRounds, function(err, hash) {
        User.create({dni: '12345678A', email: 'pacoalmenara@gmail.com', password: hash})
        User.create({dni: '12345678B', email: 'stickyamp1@gmail.com', password: hash})
        User.create({dni: '12345678C', email: 'cristiancosano@icloud.com', password: hash, admin: true})
        User.create({dni: '12345678D', email: 'jmgil@gmail.com', password: hash, admin: true})
        User.create({dni: '12345678E', email: 'antoniolrj4@gmail.com', password: hash})
        User.create({dni: '12345678F', email: 'test@test.com', password: hash})
    });



    await FoodType.create({name: 'Asiática'});
    await FoodType.create({name: 'Brasileña'});
    await FoodType.create({name: 'Mediterránea'});
    await FoodType.create({name: 'Bar de tapas'});
    await FoodType.create({name: 'Española'});
    await FoodType.create({name: 'Vanguardista'});

    Restaurant.create({name: 'Casa Pepe de la Judería', address: 'Calle Romero, 1', capacity: 22, freeSeats:22, city: 'Córdoba', description: 'Bienvenidos a Casa Pepe de la Judería, el restaurante ideal para sumergirse en la riqueza culinaria cordobesa', menu: 'Pepe_Juderia_carta.pdf', photos: ['Pepe_juderia_logo.png', 'Pepe_juderia_1.png', 'Pepe_juderia_2.png'], userDni: '12345678C', foodTypeId: 3});
    Restaurant.create({name: 'Lhardy', address: 'Carrera de S. Jerónimo, 8', capacity: 32, freeSeats:32, city: 'Madrid', description: 'Con el ornato de esta bella fachada definida por el gusto del Segundo Imperio que vuelve ahora a cautivarnos, Lhardy ha sabido conservar celosamente el ambiente cortesano y aristocrático del Madrid del siglo XX, y los comienzos del XXI al mismo tiempo que las mejores fórmulas de la cocina europea', menu: 'Lhardy_carta.pdf', photos: ['Lhardy.png', 'Lhardy_1.png', 'Lhardy_2.png'], userDni: '12345678D', foodTypeId: 5});
    Restaurant.create({name: 'Sibuya Urban Sushi Bar', address: 'Av. del Gran Capitán, 37', capacity: 42, freeSeats:42, city: 'Córdoba', description: 'Sibuya Sushi Bar es ese “peaceful place” donde puedes ir para desconectar. Sushi delicioso, atención al detalle y a la calidad y un ambiente chill único que hará que tu visita a nuestro restaurante te recargue las pilas y sea mucho más fácil volver a conectar con el mundo de ahí afuera.', menu: 'sibuya_carta.pdf', photos: ['sibuya.png', 'sibuya_1.jpg', 'sibuya_2.jpg'], userDni: '12345678D', foodTypeId: 1});
    Restaurant.create({name: 'El Rinconcillo', address: 'Gerona, 40', capacity: 55, freeSeats:55, city: 'Sevilla', description: 'Disfruta de deliciosas tapas con historia, herencia de la cocina tradicional andaluza-mozárabe, que cautivan paladares de todo el mundo', menu: 'Rinconcillo.pdf', photos: ['Rinconcillo.png', 'Rinconcillo1.jpg', 'Rinconcillo2.jpg'], userDni: '12345678C', foodTypeId: 4});
    Restaurant.create({name: 'KiraKira', address: 'Calle Caracas, 8', capacity: 42, freeSeats:42, city: 'Madrid', description: 'Fusionamos las técnicas culinarias del antiguo Japón con creaciones propias, buscando los sabores más originales y sorprendentes. Nuestra forma de entender la cocina es desde el respeto a las técnicas y al producto', menu: 'KiraKira.pdf', photos: ['KiraKira.png', 'KiraKira1.jpg', 'KiraKira2.jpg'], userDni: '12345678D', foodTypeId: 1});
    Restaurant.create({name: 'Chic&Olé', address: 'Calle Rodrigo Caro, 11', capacity: 34, freeSeats:34, city: 'Sevilla', description: 'Reconquistamos el barrio de Santa Cruz para ti. Con una decoración elegante que te transporta a un patio de buganvillas, fresco, alegre, y el aroma de nuestra cocina tradicional española elaborada con productos de calidad. Chic&Olé te transmite la más pura esencia de lo nuestro. Un viaje para tus sentidos.', menu: 'Chic.pdf', photos: ['Chic.png', 'Chic1.png', 'Chic2.png'], userDni: '12345678A', foodTypeId: 6});

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
