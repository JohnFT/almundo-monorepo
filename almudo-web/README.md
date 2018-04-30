# Almundo
Este proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Modo Desarrollo

Ejecuta el comando `ng server` para levantar servidor. Navegar a `http://localhost:4200/`. La app automáticamente recarga el navegado si hay cambios en los archivos.

## Build

Ejecuta el comando`ng build` para transpilar el proyecto. Los artefactos de construcción se almacenarán en el directorio `dist /`. Use el indicador `-prod` o el comando `--prod -aot` para una transpilacion de producción.

## Running unit tests

Ejecuta el comando `ng test` para correr los test unitarios via [Karma](https://karma-runner.github.io).

## Configuracion

El archivo config.json dentro de la carpeta ./assets/config pose los atributos urlServices Host de los servicios, ruta publica donde esta desplegado el proyecto almundo-API y urlStatics ruta publica donde esta desplegado el proyecto almundo-statics 

## Estructura del proyecto
 ```
-app
--modules
---hotels
----iterfaces
-----hotel.ts
----pages
-----index
------index.component.ts
------index.component.html
------index.component.scss
----services
-----hotel.services.ts
----hotels.modules.ts
--services
--app-canactive.service.ts
--shared
--components
----filter
-----filter.component.html
-----filter.component.scss
-----filter.component.ts
----product
-----product.component.html
-----product.component.scss
-----product.component.ts
---interfaces
----product.ts
----config.ts
---pipes
----search.pipe.ts
---services
----get-config.service.ts
---index.ts
---shared.module.ts
--app.component.ts
--app.component.html
--app.component.scss
--app.modules.ts
--app.routes.ts
--globals.ts
-assets
--config
---config.json
```
### Modulos

#### Shared Modulo

Contiene los componentes, modules, interfaces, servicios, pipes, directivas, importaciones, declaraciones que puedan ser utilizados por otros modulos

##### contenido
Componentes: 

  Filter: Este componente permite hacer filtros de búsqueda sobre un objecto retornando el valor de busques y/o la cantidad de      estrellas por la que se quiere realizar la busqueda
  
  Product: Este componente permite visualizar los productos recibe parametos de entrada name, price, starts, amenities e image 
 
Interfaces:
  Product: Esta interfas define un producto y puede ser accedida desde cualquier otro modulo
  
Pipes:
  search: Esta pipe filtra un array de objectos, recibe por parametro una lista de atributos del objeto por los cuales se quiera filtrar
  y el valor del filtro
 
Services:
  get-config.services: Este servicio controla la lectura del archivo de configuración config.js y lo almacena en el localstorage del navegador para ser accedido sin hacer tantas peticiones http al archivo
  
index: 
  Exporta cada componente, servicios, interfaces, pipres para un acceso mas fácil desde otros módulos
  
  
##### uso

En los módulos donde se quiera utilizar archivo de configuración del modulo debe importar SharedModule 

```
import { SharedModule } from '.../shared/shared.module';
@NgModule({
  imports: [
    ...,
    SharedModule
  ],...);
```

### Modulos

#### Hotels Modulo

Contiene los componentes, modules, interfaces, servicios, pipes, directivas, importaciones, declaraciones utilizados den la vista de hoteles

##### contenido
Pages: 
  Index: Este componente contine el template view de listar hoteles inplenta los componente Filtro y Productos del modulo shared,
  implementa el pipe Search para realizar filtros a la lista de hoteles
 
Interfaces:
  Hotels: Esta interfas define los atributos de un hotel
  
Services:
 hotel.service: Este servicio administra la operaciones que se pueden ralizar sobre una entidad hotel

##### uso
En los módulos donde se quiera utilizar archivo de configuración del modulo debe importar SharedModule 

```
import { HotelsModule  } from '.../modules/hotels/hotels.module';
@NgModule({
  imports: [
    ...,
    HotelsModule
  ],...);
```

### Services

Contiene los servicios que se manejan desde el modulo principal de la aplicación

##### contenido

Services:
 app-canactive.service: Este servicio es invocado por Routes de angular para validar el acceso a las rutas donde se declare la propiedad CanActivate. se en carga de hacer la petición de la configuración a le servicio de get-config.ts

##### uso
En el archivo de configuración de las rutas del proyecto incluir 

```
import { AppCanactiveService} from '.../services/app-canactive.service';

consr route: Routes = [
...,
{path:'', canActivate[AppCanactivateSrevice]}
]
export const routes = RouterModule.forRoot(APP_ROUTES, { useHash: true });
```
En la configuración del modulo

```
import { AppCanactiveService} from '.../services/app-canactive.service';
@NgModule({
  declarations: [...],
  imports: [...],
  providers: [AppCanactiveService],
```

### Rutas
Contiene la configuración rutas del proyecto

### Rutal disponibles

Lista de hoteles
```
http://localhost:4200/
```
### Globlas
Contiene las variables globales que se utilizan en el proyecto

### Varibles disponibles

```
export const token = '_almundo:token_';
export const routes = '_almundo:routes_';
```
token: es el nombre que recibe el ítem de loclastorage para accesar a la información del toke
routes: es el nombre que recibe el ítem de loclastorage para accesar a la información del archivo config.json en el storage


## Autor

* **John Alexander Fonseca Tumay**
