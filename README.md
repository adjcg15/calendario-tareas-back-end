# Calendario de tareas (backend)
Para correr el servidor localmente se necesita la base de datos
```
docker-compose up -d
```
* El -d, significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
*Mongo URL local:
```
MONGO_URL=mongodb://localhost:27017/calendardb
```
*Puerto recomendado:
```
PORT=4000
```

*Reconstruir los módulos de node y levantar el servidor local
```
npm install
npm run dev
``