import express from "express"
import { UserModel } from "../models/user.js";
import bycrpt from "bcrypt"
import { generateJWT } from "../helpers/jwt.js";

export const createNewUser = async (req, res) => {
  const { email, password } = req.body;
  try {

    let usuario = await UserModel.findOne({ email });
    if( usuario) return res.status(400).json({ ok: false, msg: 'Un usuario ya tiene este email'})

    usuario = new UserModel(req.body);

    const salt = bycrpt.genSaltSync();
    usuario.password = bycrpt.hashSync( password, salt);

    await usuario.save();

    //* Generar JWT
    const token = await generateJWT( usuario.id, usuario.name );

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
    })
  }

};

export const loginUser = async (req, res = express.response) => {

  const { email, password} = req.body;

  try {
    const usuario = await UserModel.findOne({ email });
    if( !usuario ) return res.status(400).json({ ok: false, msg: 'El user no existe con ese email'})

    const validPassword = bycrpt.compareSync( password, usuario.password);

    if( !validPassword ) return res.status(400).json({ ok: false, msg: 'Password incorrecta'})

    //* Generar JWT
    const token = await generateJWT( usuario.id, usuario.name );

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
    })
  }
}

export const revalidToken = async (req, res = express.response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token
  })
}