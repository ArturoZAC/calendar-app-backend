import express from 'express';
import cors from "cors"
import 'dotenv/config';
import path from "path"
import { dbConnection } from './database/config.js';
import { authRouter } from './routes/auth.js'
import { eventsRouter } from './routes/events.js';

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
app.use('/api/auth', authRouter );
app.use('/api/events', eventsRouter );

app.use('*', (req,res) => {
  res.sendFile( path.join(__dirname, 'public/index.html') )
})

app.listen(process.env.PORT, () => {
  console.log(`Estoy vivo en el port: ${process.env.PORT}`)
})