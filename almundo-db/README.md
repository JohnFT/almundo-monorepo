# Almundo-DB
Es aplicación Nodejs utiliza (Sequalize)[http://docs.sequelizejs.com/] como ORM para crea una acceso a datos multimotor es usado en proyectos como la capa de acceso a datos 
## Estructura

```
--lib
---db.js
---hotel.js
---amenitie.js
---hotelamenitie.js
--mocks
---hotels.js
---amenities.js
--models
---hotels.js
---amenities.js
---hotelamenities.js
--scripts
---postgres.sql
-examples
--index.js
--setup
```

# Models

Estos módulos contiene los modelos de las entidades que se crearan en la base de datos hotels, amenities, hotelsamenities

## Hotel.js

Este módulo crear el modelo de la entidad hotel

##### usage
```
const setupHotelModel = require('./models/hotels'); // Model Hotel

const hotelModel = setupHotelModel(config);

```

## Amenitie.js

Este módulo crear el modelo de la entidad amenitie

##### usage
```
const setupAmenitieModel = require('./models/amenitie'); // Model Hotel

const amenitieModel = setupAmenitieModel(config);

```


## HotelAmenitie.js

Este módulo crear el modelo de la entidad hotelamenitie

##### usage
```
const setupHotelAmenitieModel = require('./models/hotelamenitie'); // Model Hotel

const hotelamenitieModel = setupHotelAmenitieModel(config);

```
#Lib
Modulos que interactuan con la base de datos

## db.js

Este método configura la conexión a la base de datos, devuelve un Singleton de la conexión de la base de datos

#### usage
```
const db = require('../lib/db');
const config: {
        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_MANAGE || 'postgres',
        logging: s => debug(s),
        freezeTableName: true,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        },
        setup: true
    }
}

const squalize = db(config);
```
## hotel.js

Este modulo permite interactuar con la base de datos con la entidad hotel, recibe por parámetro el modelo de hotel y el modelo de amenitie.

Permite crear, actualizar, modificar, eliminar hoteles
Para utilizar objeto en memori los parametros deben ir null

### usage

```
const setupHotel = require('./lib/hotel'); 
const setupHotelModel = require('./models/hotels'); // Model Hotel
const setupAmenitieModel = require('./models/amenities'); // Model Amenitie

const hotelModel = setupHotelModel(config);
const amenitieModel = setupAmenitieModel(config);

hotelModel.belongsToMany(amenitieModel, {
            through: hotelamenitiesModel
});

amenitieModel.belongsToMany(hotelModel, {
    through: hotelamenitiesModel
});
        
const Hotels = setupHotel(hotelModel, amenitieModel);
const HotelsMemoriObject = setupHotel(null, null);

Hotels.findAll() // Obtener todos
Hotels.findById(1) // Hotel por id @Param id number
Hotels.findByName('Hotel') // Hotel por nombre @Param name string
Hotels.findByStars(3) // Hotel por estrellas @Param stars number
Hotels.findByNameAndStars('Hotel', 3) // Hotel por nombre y estrellas @Param name string @Param stars number
const hotel = {
}
Hotels.createOrUpdate(hotel) // Crea o actualiza un nuevo hotel @Param hotel Hotel 

Hotels.deleteHotel(hotel) // Elimina  hotel @Param hotel Hotel 
```

## amenitie.js

Este modulo permite interactuar con la base de datos con la entidad amenitie, recibe por parámetro el modelo de amenitie.
Permite crear amenitie;


### usage

```
const setupAmenitie = require('./lib/amenitie'); 
const setupAmenitieModel = require('./models/amenities'); 

const amenitieModel = setupAmenitieModel(config);
        
const Amenitie = setupAmenitie(amenitieModel);

Amenitie.findAll() // Obtener todos

const amenitie = {
}
Amenitie.createOrUpdate(amenitie) // Crea o actualiza un nuevo amenitie @Param amenitie Amenitie 

```

## hotelamenitie.js

Este modulo permite interactuar con la base de datos con la entidad hotelamenitie, recibe por parámetro el modelo de hotelamenitie.
Permite crear hotelamenitie;


### usage

```
const setupHotelAmenitie = require('./lib/hotelamenitie'); 
const setupHotelAmenitieModel = require('./models/hotelamenitie'); 

const hotelamenitieModel = setupHotelAmenitieModel(config);
        
const Hotelamenitie = hotelamenitieModel(hotelamenitieModel);

Hotelamenitie.findAll() // Obtener todos

const amenitie = {
}
Hotelamenitie.createOrUpdate(hotelamenitie) // Crea o actualiza un nuevo hotelamenitie @Param amenitie Hotelamenitie 

```
# Mocks

Son Objetos que simulan los datos de que generalmente se guardan en la base de datos este objeto se mantiene en memoria para ser utilizado en pruebas o cache del servidor

## Hotel.js

Abstracción de objetos del tipo Hotel 100 registro 

### usage

```
const hotels = require('./mocks/hotels'); 
console.log(hotels);

```

## Animities.js

Abstracción de objetos del tipo Animities 16 registro 

### usage

```
const anemities = require('./mocks/anemities'); 
console.log(anemities);

```

# Script
Scripts de creacion de base de datos con el usuario almundo asignando clave y permisos sobre la base de datos

Postgres.sql

# Example
Example es un modulo de prueba el cual crea la base de datos a través de squalize eliminando y creando de nuevo las tablas, registrando los mocks que se encuentran en los archivos de la carpeta mocks

### usage

```
> node ../examples/index.js
```


# Endponit Index.js
Este modulos crear la conexion a la base de datos, puede restaurar la y prepara los modelos para se utilizados retorna los setup los objetos que interactuan con las entidades de la base de datos

### usage
const db = require('../index');
const consf = {

        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        logging: s => debug(s),
        operatorsAliases: false,
        memory: false // trabajar con mocks
    }
async  getConnection(conf) => {
services = await db(conf.db);
}

const entities = getConnection(conf);

entities.Hotels.findAll();
entities.Animities.findAll();
entities.HotelsAnimities.findAll();
```
> node ../examples/index.js
```


