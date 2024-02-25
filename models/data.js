import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    name: String,
    phonenumber: {type:String, unique:true},
    email: {type:String, unique:true},
    hobbies: [String],
});

const DataMessage = mongoose.model('DataMessage',dataSchema);

export default DataMessage