import DataMessage from "../models/data.js";
import mongoose from "mongoose";


export const getdata = async(req,res) =>{

    try{
        const data = await DataMessage.find();

        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createdata = async(req,res) =>{
    const {name, email, phonenumber, hobbies} = req.body;
    
    const newData = new DataMessage({name, email, phonenumber, hobbies});
    try{
        await newData.save();

        res.status(201).json(newData);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const deletedata = async(req,res) => {

    const { id } = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no data with that id');

    await DataMessage.deleteOne({_id: id});

    res.json({message: 'Data detected successfully'});
}

export const updatedata = async (req, res) => {
    const { id } = req.params;
    const {name, email, phonenumber, hobbies} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedData = { name, email, phonenumber, hobbies, _id: id };

    await DataMessage.findByIdAndUpdate(id, updatedData, { new: true });

    res.json(updatedData);
}


