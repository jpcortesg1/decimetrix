# Decimetrix

Esta es la prueba tecnica para la prueba de desarrollo para la empresa decimetrix

## Clonar la aplicación

correr en cmd, terminal
```
  $ git clone https://github.com/jpcortesg1/decimetrix.git
```

## Para correr el back

Crear base datos postgreSQL.
Configurar variables en un archivo .env
```
  PORT

  USER_DB

  PASSWORD_DB

  HOST_DB

  PORT_DB

  NAME_DB

  SECRET_KEY
```

correr en cmd, terminal:
```
  $ cd api/database
```

Crear archivo database.json
```
{
  "dev": {

    "driver": "pg",
    "user": "user",
    "password": "password",
    "host": "host",
    "database": "name db"
  }
}
```

## Crear la base de datos

Correr en cmd, terminal:
```

  $ npm install -g db-migrate

  $ db-migrate up initialize

  $ db-migrate up tasks

  $ db-migrate up deleteColumAndAddColumsUser

  $ db-migrate up changeValueVarcharPasswordUser

  $ db-migrate up changeValueVarcharPasswordUser
```

Asi la base de datos quedaría configurada

correr en terminal, cmd
```
  $ cd ../

  $ npm run start
```

## Para correr el Front ENd

Cambiar el proxy en el archivo package.json para llamar la api en las llamadas

Añadir un archivo .env con la variable, donde PORT es el puerto definido para el back
```
  REACT_APP_PF = http://localhost:PORT/images/
```

Ejecutar en terminal o cmd
```
  $ cd client/

  $ npm run start
```