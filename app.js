import express from 'express';
import cors from "cors"
import 'dotenv/config';
import { router } from './routes/auth.js'
import { dbConnection } from './database/config.js';

//* Server
const app = express();

//*Base de Datos
dbConnection();

//* CORS
app.use(cors());

//* Directorio Publico
app.use( express.static( 'public' ));

//* Lectura de RAW-JSON
app.use( express.json() );

//* Rutas
app.use('/api/auth', router );

app.listen(process.env.PORT, () => {
  console.log(`Estoy vivo en el port: ${process.env.PORT}`)
})