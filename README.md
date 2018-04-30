# Almundo-Hotels
## Descripción
La apliacion Almundo - Hotels esta compuesto por 3 projectos Nodejs y uno de tipo Angular 5, contruido con el patron monorepo, en el cual 
en un repositorio se encuentran varios tios de projectos que conforman una aplicacion, cada uno de estos cumple un rol y se encarga de manejar 
diferentes procesos.

### almundo-db 
Es un proyecto en Nodejs la capa depersistencia, trabaja con un ORM (squalize) soportando motores de base de datos como postgresql,
mysql, sqlserver, sqlite  o un objeto en memoria para la coleccion de registros mocks

### almundo-statics 
Es un proyecto en Nodejs trabaja como servidors de archivos statics, para disminuir la concurrencia hacia los demas servidores

### almundo-api
Es un proyecto Nodejs utiliza express framework para la implementacion de APIS REST, importa el modulos almundo-db para la 
persistencias de datos. Implementa jwt json web authetication para los servicios de creacion y eliminacion de registros

### almundo-web 
Es un proyecto en Angular 5 encargado del front-end de la aplicacion la cual lista y realiza consultas de los hoteles existentes 

##
## Requirimientos

### Node

[Node](http://nodejs.org/) los proyectos utiliza tecnoliga es6 por lo cual la version de Nodejs debe ser compatibles con estos features 

    $ node --version
    v4.3.2^

    $ npm --version
    2.3.21
---

## Instalacion

    $ git clone  https://github.com/JohnFT/almundo-monorepo.git
    $ cd PROJECT
    $ npm install

