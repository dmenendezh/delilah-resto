Delilah Resto - Sprint 3 Project

1. Clonar el proyecto en su entorno de trabajo Visual Studio.
2. Instalar NodeJS y XAMPP.
3. Mediante la consola "Terminal" ejecutar el comando 'npm install'.
4. Abrir XAMPP y iniciar el servicio de MySQL (chequear el puerto donde levanta el servicio).
5. Abrir el cliente 'MySQL Workbench' y ejecute el archivo delilah-resto-db-creation.sql, el cual creara la base de datos con cada uno de los objetos correspondientes.

6. Dentro del proyecto bajado en Visual Studio, configurar el archivo con nombre .env, con la información que corresponda y fue configurada en su PC:
7. 
      APP_PORT=3000
      DB_HOST=localhost
      DB_PORT=3306
      DB_NAME=delilah-resto-api
      DB_USER=root


NOTA:
1. Mediante el archivo 'delilah-resto-api.yaml' que se encuentra dentro de la carpeta documentation, podrá acceder a la información para cada servicio vía Swagger.
2. Mediante el archivo 'delilah-resto-api.postman_collection.json', podrá probar facilmente la API en Postman.