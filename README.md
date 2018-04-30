# Almundo-Hotels
## Descripción
Almundo - Hotels esta compuesto por 3 proyectos Nodejs y uno de tipo Angular 5, construido con el patrón mono repo, en el cual en un repositorio se encuentran varios Tipos de proyectos que conforman una aplicación, cada uno de estos cumple un rol y se encarga de manejar diferentes procesos.

### almundo-db 
Es un proyecto en la capa persistencia, trabaja con un ORM (squalize) soportando motores de base de datos como postgresql,
MySQL,sqlserver, sqlite  o un objeto en memoria para la colección de registros mocks

### almundo-statics 
Es un proyecto en Nodejs trabaja como servidor de archivos estáticos, para disminuir la concurrencia hacia los demás servidores

### almundo-api
Es un proyecto Nodejs utiliza Express Framework para la implementación de APIS REST, importa el módulos almundo-db para la 
persistencias de datos. Implementa jwt json web authetication para los servicios de creación y eliminación de registros

### almundo-web 
Es un proyecto en Angular 5 encargado del front-end de la aplicación la cual lista y realiza consultas de los hoteles existentes 

##
## Requirimientos

### Node

[Node](http://nodejs.org/)  los proyectos utiliza tecnóloga es6 por lo cual la versión de Nodejs debe ser compatibles con estos features 

    $ node --version
    v4.3.2^

    $ npm --version
    2.3.21
---

## Instalacion

    $ git clone  https://github.com/JohnFT/almundo-monorepo.git
    $ cd PROJECT
    $ npm install

## Autor

* **John Alexander Fonseca Tumay**
