import express from "express"
import { EventModel } from "../models/event.js"

export const getEvents = async ( req, res = express.response ) => {

  const allEvents = await EventModel.find()
                                        .populate('user', 'name')

  res.json({
    ok: true,
    allEvents
  })
}

export const createEvent = async ( req, res = express.response ) => {

  const event = new EventModel( req.body );

  try {
    event.user = req.uid;

    const eventSave = await event.save();

    res.json({
      ok: true,
      event: eventSave
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }


}

export const updateEvent = async ( req, res = express.response ) => {
  
  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const eventFind = await EventModel.findById( eventId );
    if ( !eventFind ) return res.status(404).json({ ok: false, msg: 'Event not exist'})

    if( eventFind.user.toString() !== uid ) return res.status(401).json({ ok: false, msg: 'No tiene privilegio de editor este evento'})

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventActualizado = await EventModel.findByIdAndUpdate( eventId, newEvent, { new: true})

    return res.json({
      ok:true,
      event: eventActualizado
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
 
}

export const deleteEvent = async ( req, res = express.response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const eventFind = await EventModel.findById( eventId );
    if ( !eventFind ) return res.status(404).json({ ok: false, msg: 'Event not exist'})

    if( eventFind.user.toString() !== uid ) return res.status(401).json({ ok: false, msg: 'No tiene privilegio de editor este evento'})

    await EventModel.findByIdAndDelete( eventId )

    return res.json({
      ok:true,
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
