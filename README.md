# Next.js Open Jira
Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

* el -d significa __detached__


# MongoDB URL Local:
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno y agregar los valores
Renombrar el archivo __.env.template__ a __.env__ 

Revisar el arvhivo __.env.example__ como referencia para el archivo __.env__


* Recontruir los modulos de node y levantar Next
```
yarn install
yarn dev
```



## LLenar la base de datos con informacion de pruebas

Llamar:
``` 
    http://localhost:3000/api/seed
```

*** Nota: si se llama la segunda vez purga la base de datos y carga 3 registros nuevamente





