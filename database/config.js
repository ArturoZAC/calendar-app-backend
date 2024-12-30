import mongoose from "mongoose";

export const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.DB_CNN)    

    console.log('BD ONLINE')
  } catch (error) {
    console.log(error)
    throw new Error('Error al conectar a la BD')
  }

}