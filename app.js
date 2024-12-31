import express from 'express';
import cors from "cors"
import 'dotenv/config';
import { dbConnection } from './database/config.js';
import { authRouter } from './routes/auth.js'
import { eventsRouter } from './routes/events.js';

//* Server
const app = express();

//*Base de Datos
(async () => {
  try {
    await dbConnection();
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
    process.exit(1); // Termina el proceso si falla la conexión a la base de datos
  }
})();

//* CORS
app.use(cors());

//* Directorio Publico
app.use( express.static( 'public' ));

//* Lectura de RAW-JSON
app.use( express.json() );

//* Rutas
app.use('/api/auth', authRouter );
app.use('/api/events', eventsRouter );

app.listen(process.env.PORT, () => {
  console.log(`Estoy vivo en el port: ${process.env.PORT}`)
})