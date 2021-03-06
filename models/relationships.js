const { Rating } = require("./Rating");
const { Restaurant } = require("./Restaurant");
const { User } = require("./User");
const { Sequelize, Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require("./SequelizeManager");
const { FoodType } = require("./FoodType");
const { History } = require("./History");
const { QueryTypes } = require('sequelize');
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
    await History.drop();
    await sequelize.sync();

    bcrypt.hash('password', saltRounds, async function(err, hash) {
        await User.create({dni: '12345678A', email: 'pacoalmenara@gmail.com', password: hash})
        await User.create({dni: '12345678B', email: 'stickyamp1@gmail.com', password: hash})
        await User.create({dni: '12345678C', email: 'cristiancosano@icloud.com', password: hash, admin: true})
        await User.create({dni: '12345678D', email: 'jmgil@gmail.com', password: hash, admin: true})
        await User.create({dni: '12345678E', email: 'antoniolrj4@gmail.com', password: hash})
        await User.create({dni: '12345678F', email: 'test@test.com', password: hash})
    });



    await FoodType.create({name: 'Asiática'});
    await FoodType.create({name: 'Brasileña'});
    await FoodType.create({name: 'Mediterránea'});
    await FoodType.create({name: 'Bar de tapas'});
    await FoodType.create({name: 'Española'});
    await FoodType.create({name: 'Vanguardista'});

    await Restaurant.create({name: 'Casa Pepe de la Judería', address: 'Calle Romero, 1', capacity: 22, freeSeats:22, city: 'Córdoba', description: 'Bienvenidos a Casa Pepe de la Judería, el restaurante ideal para sumergirse en la riqueza culinaria cordobesa', menu: 'Pepe_Juderia_carta.pdf', photos: ['Pepe_juderia_logo.png', 'Pepe_juderia_1.png', 'Pepe_juderia_2.png'], userDni: '12345678C', foodTypeId: 3});
    await Restaurant.create({name: 'Lhardy', address: 'Carrera de S. Jerónimo, 8', capacity: 32, freeSeats:32, city: 'Madrid', description: 'Con el ornato de esta bella fachada definida por el gusto del Segundo Imperio que vuelve ahora a cautivarnos, Lhardy ha sabido conservar celosamente el ambiente cortesano y aristocrático del Madrid del siglo XX, y los comienzos del XXI al mismo tiempo que las mejores fórmulas de la cocina europea', menu: 'Lhardy_carta.pdf', photos: ['Lhardy.png', 'Lhardy_1.png', 'Lhardy_2.png'], userDni: '12345678D', foodTypeId: 5});
    await Restaurant.create({name: 'Sibuya Urban Sushi Bar', address: 'Av. del Gran Capitán, 37', capacity: 42, freeSeats:42, city: 'Córdoba', description: 'Sibuya Sushi Bar es ese “peaceful place” donde puedes ir para desconectar. Sushi delicioso, atención al detalle y a la calidad y un ambiente chill único que hará que tu visita a nuestro restaurante te recargue las pilas y sea mucho más fácil volver a conectar con el mundo de ahí afuera.', menu: 'sibuya_carta.pdf', photos: ['sibuya.png', 'sibuya_1.jpg', 'sibuya_2.jpg'], userDni: '12345678D', foodTypeId: 1});
    await Restaurant.create({name: 'El Rinconcillo', address: 'Gerona, 40', capacity: 55, freeSeats:55, city: 'Sevilla', description: 'Disfruta de deliciosas tapas con historia, herencia de la cocina tradicional andaluza-mozárabe, que cautivan paladares de todo el mundo', menu: 'Rinconcillo.pdf', photos: ['Rinconcillo.png', 'Rinconcillo1.jpg', 'Rinconcillo2.jpg'], userDni: '12345678C', foodTypeId: 4});
    await Restaurant.create({name: 'KiraKira', address: 'Calle Caracas, 8', capacity: 42, freeSeats:42, city: 'Madrid', description: 'Fusionamos las técnicas culinarias del antiguo Japón con creaciones propias, buscando los sabores más originales y sorprendentes. Nuestra forma de entender la cocina es desde el respeto a las técnicas y al producto', menu: 'KiraKira.pdf', photos: ['KiraKira.png', 'KiraKira1.jpg', 'KiraKira2.jpg'], userDni: '12345678D', foodTypeId: 1});
    await Restaurant.create({name: 'Chic&Olé', address: 'Calle Rodrigo Caro, 11', capacity: 12, freeSeats:12, city: 'Sevilla', description: 'Reconquistamos el barrio de Santa Cruz para ti. Con una decoración elegante que te transporta a un patio de buganvillas, fresco, alegre, y el aroma de nuestra cocina tradicional española elaborada con productos de calidad. Chic&Olé te transmite la más pura esencia de lo nuestro. Un viaje para tus sentidos.', menu: 'Chic.pdf', photos: ['Chic.png', 'Chic1.png', 'Chic2.png'], userDni: '12345678A', foodTypeId: 6});

    await Rating.create({rating: 1, restaurantId: 1, userDni: '12345678A'})
    await Rating.create({rating: 5, restaurantId: 1, userDni: '12345678B'})
    await Rating.create({rating: 3, restaurantId: 1, userDni: '12345678C'})
    await Rating.create({rating: 2, restaurantId: 1, userDni: '12345678D'})
    await Rating.create({rating: 5, restaurantId: 1, userDni: '12345678E'})


    await Rating.create({rating: 5, restaurantId: 2, userDni: '12345678A'})
    await Rating.create({rating: 4, restaurantId: 2, userDni: '12345678B'})
    await Rating.create({rating: 3, restaurantId: 2, userDni: '12345678C'})
    await Rating.create({rating: 2, restaurantId: 2, userDni: '12345678D'})
    await Rating.create({rating: 1, restaurantId: 2, userDni: '12345678E'})


    await Rating.create({rating: 5, restaurantId: 3, userDni: '12345678A'})
    await Rating.create({rating: 5, restaurantId: 3, userDni: '12345678B'})
    await Rating.create({rating: 5, restaurantId: 3, userDni: '12345678C'})
    await Rating.create({rating: 4, restaurantId: 3, userDni: '12345678D'})
    await Rating.create({rating: 2, restaurantId: 3, userDni: '12345678E'})


    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-17 13:00:12', '2021-05-17 14:00:32', 1, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-17 13:00:43', '2021-05-17 14:00:45', 1, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (0, '2021-05-17 13:15:12', '2021-05-17 13:50:34', 1, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-17 13:15:50', '2021-05-17 13:50:23', 1, '12345678D')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:23:13', '2021-05-17 14:10:12', 1, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (7, '2021-05-17 14:01:40', '2021-05-17 15:00:34', 1, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 13:03:26', '2021-05-18 13:47:20', 1, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (7, '2021-05-18 13:07:30', '2021-05-18 14:23:01', 1, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (8, '2021-05-18 14:12:00', '2021-05-18 16:57:32', 1, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-18 15:05:10', '2021-05-17 15:40:40', 1, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 1, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-19 13:00:00', '2021-05-19 14:37:20', 1, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-19 14:23:23', '2021-05-19 15:34:30', 1, '12345678C')", { type: QueryTypes.INSERT });
    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:00:12', '2021-05-17 14:00:32', 2, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-17 13:00:43', '2021-05-17 14:00:45', 2, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (6, '2021-05-17 13:15:12', '2021-05-17 13:50:34', 2, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-17 13:15:50', '2021-05-17 13:50:23', 2, '12345678D')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:23:13', '2021-05-17 14:10:12', 2, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (7, '2021-05-17 14:01:40', '2021-05-17 15:00:34', 2, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-19 13:03:26', '2021-05-18 13:47:20', 2, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (7, '2021-05-19 13:07:30', '2021-05-18 14:23:01', 2, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (8, '2021-05-19 14:12:00', '2021-05-18 16:57:32', 2, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-19 15:05:10', '2021-05-17 15:40:40', 2, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 2, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (6, '2021-05-19 13:00:00', '2021-05-19 14:37:20', 2, '12345678F')", { type: QueryTypes.INSERT });
    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-17 13:20:12', '2021-05-17 14:00:32', 3, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-17 13:20:43', '2021-05-17 14:00:45', 3, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-17 13:15:12', '2021-05-17 13:50:34', 3, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-17 13:15:50', '2021-05-17 13:50:23', 3, '12345678D')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (6, '2021-05-17 13:23:13', '2021-05-17 14:10:12', 3, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-17 14:01:40', '2021-05-17 15:00:34', 3, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (0, '2021-05-18 13:03:26', '2021-05-18 13:47:20', 3, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 13:07:30', '2021-05-18 14:23:01', 3, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 14:12:00', '2021-05-18 16:57:32', 3, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (7, '2021-05-18 15:05:10', '2021-05-17 15:40:40', 3, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 3, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-19 13:00:00', '2021-05-19 14:37:20', 3, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-19 14:23:23', '2021-05-19 15:34:30', 3, '12345678C')", { type: QueryTypes.INSERT });

    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-17 13:20:12', '2021-05-17 14:00:32', 4, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:20:43', '2021-05-17 14:00:45', 4, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:15:12', '2021-05-17 13:50:34', 4, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-17 13:15:50', '2021-05-17 13:50:23', 4, '12345678D')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 13:23:13', '2021-05-17 14:10:12', 4, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-18 14:01:40', '2021-05-17 15:00:34', 4, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 13:03:26', '2021-05-18 13:47:20', 4, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 13:07:30', '2021-05-18 14:23:01', 4, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-18 14:12:00', '2021-05-18 16:57:32', 4, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 15:05:10', '2021-05-17 15:40:40', 4, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 4, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-19 13:00:00', '2021-05-19 14:37:20', 4, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (6, '2021-05-19 14:23:23', '2021-05-19 15:34:30', 4, '12345678C')", { type: QueryTypes.INSERT });

    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-17 13:20:12', '2021-05-17 14:00:32', 5, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:20:43', '2021-05-17 14:00:45', 5, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:15:12', '2021-05-17 13:50:34', 5, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (9, '2021-05-17 13:15:50', '2021-05-17 13:50:23', 5, '12345678D')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 13:23:13', '2021-05-17 14:10:12', 5, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (5, '2021-05-18 14:01:40', '2021-05-17 15:00:34', 5, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 13:03:26', '2021-05-18 13:47:20', 5, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 13:07:30', '2021-05-18 14:23:01', 5, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-18 14:12:00', '2021-05-18 16:57:32', 5, '12345678C')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 15:05:10', '2021-05-17 15:40:40', 5, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 5, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-19 13:00:00', '2021-05-19 14:37:20', 5, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (6, '2021-05-19 14:23:23', '2021-05-19 15:34:30', 5, '12345678C')", { type: QueryTypes.INSERT });

    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-17 13:30:12', '2021-05-17 14:00:32', 6, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-17 13:20:43', '2021-05-17 14:00:45', 6, '12345678B')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (3, '2021-05-18 13:25:13', '2021-05-17 14:10:12', 6, '12345678E')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 14:11:40', '2021-05-17 15:00:34', 6, '12345678F')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-18 13:43:26', '2021-05-18 14:47:20', 6, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (2, '2021-05-18 15:05:10', '2021-05-17 15:40:40', 6, '12345678D')", { type: QueryTypes.INSERT });    
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (1, '2021-05-19 12:12:12', '2021-05-19 13:14:15', 6, '12345678A')", { type: QueryTypes.INSERT });
    await sequelize.query("INSERT INTO `history` (companions, createdAt, updatedAt, restaurantId, userDni) VALUES (4, '2021-05-19 13:20:00', '2021-05-19 14:35:20', 6, '12345678B')", { type: QueryTypes.INSERT });
    
};


(async function(){
    //await migrateSeed() //OJO: Si se descomenta esto borra todos los datos y mete los que incluye por defecto la función
})();
