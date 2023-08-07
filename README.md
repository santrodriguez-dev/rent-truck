# Alquiler de camiones para trasteos

Esta es una aplicación que ayuda a gestionar el alquiler de diferentes tipos de vehículos para realizar trasteos

## Installation

Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
1. Usa el comando npm install para instalar las dependencias con node v18
   ```sh
   npm install
   ```
1. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
1. Run project
   ```sh
   npm run dev
   ```
1. Run tests
   ```sh
   npm run test
   ```

## Comandos prisma

1. Sincronizar la base de datos con el esquema
   ```sh
   npx prisma db push
   ```
1. Abre playground de base de datos
   ```sh
   npx prisma studio
   ```
1. Create the migration:
   ```sh
   npx prisma migrate dev --name init
   ```

## Requerimientos

- [x] Agregar, actualizar usuarios
   - [x] Evitar almacenar dos usuarios con el mismo email
- [x] Agregar, actualizar vehiculos
   - [x] Evitar almacenar dos vehiculos con la misma placa
- [x] Rentar un vehiculo
    - [x] Maximo de horas permitidas debe ser 8h
    - [x] Minimo de horas permitidas debe ser 2h
    - [x] No es posible almacenar una renta con una fecha expirada. ej: 2018-05-03 (fecha pasada)
    - [x] Validar que solo sea posible rentar un vehiculo en las franjas horarias disponibles. horarios permitidos (min 4am, max 4pm)
    - [x] Solo es posible arrendar un vehiculo en dias laborales (Lunes-Viernes)
    - [x] Validar que un vehiculo no se pueda rentar mas de una vez en la misma franja horaria

## Tests
- [] Un usuario no puede ser almacenado si el email ya existe en la base de datos
- [] Un vehiculo no puede ser almacenado si la placa ya existe en la base de datos
- [] Un vehiculo no puede ser rentado si es un dia festivo
- [] Un vehiculo no puede ser rentado despues de las 4pm
- [] Un vehiculo no puede ser rentado si el horario se cruza con un servicio ya asignado
- [] Un vehiculo no puede ser rentado en una fecha pasada

## Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* Nodejs
* Express framework
* Prisma ORM
* Valibot

## Contributing

Las solicitudes de extracción son bienvenidas. Para cambios importantes, abra un problema primero
para discutir lo que le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda.

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Santiago Rodriguz - srodriguezm95@gmail.com

Project Link: [https://github.com/santrodriguez-dev/rent-truck](https://github.com/santrodriguez-dev/rent-truck)
