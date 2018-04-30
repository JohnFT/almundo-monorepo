# Almundo-API
Este proyecto es una API REST utilaza [Express framework](http://expressjs.com/es/)
Previamente se debe instalar la aplicación almundo-db la cual se encuentra como dependencia de archivo en el archivo package.jons;
para cambiar la ruta del proyecto remplazar la ubicación
```
// Package.json

"dependencies": {
    "almundo-db": "file:../almundo-db", // remplazar ubicación
    "body-parser": "^1.18.2",
    "chalk": "^2.4.1",
    "debug": "^3.1.0",
    "express": "^4.16.3",
    "express-asyncify": "^1.0.0",
    "express-jwt": "^5.3.1",
    "jsonwebtoken": "^8.2.1",
    "nodemon": "^1.17.3"
  }
```
```
 > npm install
```

## Modo Desarrollo

Ejecuta el comando `npm start-dev` para levantar el servidor en modo debug, se implementa nodemon para reiniciar el servidor al producirse algún cambio en los archivos. Si se configura como variable del sistema PORT la aplicación escuchara el servidor en le puerto asignado a esta variable de lo contrario correera en el puerto 3000 `http://localhost:${Port}/`.

## Build

Ejecuta el comando `npm start` para desplegar el servidor en modo deploy production

## Configuracion

En ambientes de producción se recomienda implementar las siguientes variables del sistema o se utilizaran sus valores por defecto:
```
const port = process.env.PORT || 3000 //  Puerto del la aplicacion
process.env.DB_NAME || 'almundo', // base de datos
process.env.DB_USER || 'almundo', // usuario base de datos
process.env.DB_PASS || 'almundo2018*', // clave del usuario en el motor de la base de datos
process.env.DB_HOST || 'localhost', // host del despliege
process.env.API_SECRET || 'almundo-secret' // clave privada para la generacion de los jwt
```
La aplicación utiliza el proyecto almundo-db como modulo de persistencia a la base de datos el archivo `config.js` contine el objeto de configuración.

```
    db: {

        database: process.env.DB_NAME || 'almundo', // base de datos
        username: process.env.DB_USER || 'almundo', // usuario base de datos
        password: process.env.DB_PASS || 'almundo2018*', // clave del usuario en el motor de la base de datos
        host: process.env.DB_HOST || 'localhost', // host del despliege
        logging: s => debug(s), // log de sentencias
        operatorsAliases: false, 
        memory: false // utilizar objeto en memoria y no una conexion a la base de datos
    },
    auth:{
        secret: process.env.API_SECRET || 'almundo-secret' // llave privada para la creacion de jwt
    }
```


## Estructura del proyecto
 ```
--api.js
--auth.js
--config.js
--server.js
```

### API.js
Contiene la implementación de los endpoints de la aplicación

#### Endpoints Disponibles
```
GET /api/hotels // lista los hoteles
GET /api/hotels/name/:name // lista los hoteles con nombre que coincidan
GET /api/hotels/stars/:stars // lista los hoteles con la cantidad de estrellas definidos por el parametro stars
GET /api/hotels/:name/:stars // lista los hoteles con la cantidad de estrellas definidos por el parametro stars y por los nombre que concidab con el parametro nombre
```
#### JWT Endponits
Algunos Endpoints utilizan JWT json web tokens como metodo de seguridad, para esto se implementa el modulo jsonwebtoken y exprees-jwt que permiten la generación y validación de los jwt en las peticiones http
```
GET /api/auth // Crea un nuevo jwt que podras utilizar en una peticion futura
POST /api/hotels // Crea o actualiza un hotel
DELETE /api/hotels // Elimina un hotel
```

## Middelware
Access-Control-Allow-Origin: permite acceso desde cualquier origen para el consumo de los servicios rest

Body-Parse: decodifica los objetos json que vienen en la url de request

DBConnection: este middelware crea un Singleton de la conexión a la base de datos retornando una instancia del modulo almundo-db

Auth.: verifica el envío del jwt en la cabecera http del request y que este sea valido

asyncify: crea endponit asíncronos en Express

  
##### uso

El modulo api debe ser requerido retorna un middelware con la anterior definido

```
const asyncify = require('express-asyncify');
const express = require('express');
const app = asyncify(express());
const routes = require('./api'); 

app.use('/api', routes);
```
### Config.js

Este modulo se encarga de almacenar la información de configuraciones de la aplicación. la llave secreta para los jwt y la configuración del modulo de almundo-db

##### uso
```
   db: {

        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        logging: s => debug(s),
        operatorsAliases: false,
        memory: false
    },
    auth:{
        secret: process.env.API_SECRET || 'almundo-secret'
    }
```

```
const conf = require('./config');

consf.auth.secret
```
### Auth.js

Este modulo se encarga de verificar y firmar los jwt que se utilizaran
sing(pyload, secret, time)  crea un jwt recibe un cuerpo, la llave privada y el tiempo de expiración 
verify(token, secret) verifica un jwt recibe el toke y la llave privada
por defecto el pyload de la aplicacion es el usuario `jfonseca` y la fecha completa actual

##### uso


```
const generateAuth = require('./auth'); // Mudule generates auth jwt 
const conf = require('./config');
function getJwt(){

    const pyload = {
        date: new Date().toString(),
        user: 'jfonseca'
    }
    try {
        var token = generateAuth.sign(pyload, conf.auth.secret, '1h')
        generateAuth.verify(token, conf.auth.secret);
        return token;
    } catch (err) {
        console.log(err);
    }
}

console.log(getJwt());

```

### Server.js
Este modulo se encarga configurar, manejo de errores, crear el servidor y escucha las peticiones

##### uso
```
node sever.js
```


## Autor

* **John Alexander Fonseca Tumay**
