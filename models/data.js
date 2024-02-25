import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({
    name: String,
    phonenumber: String,
    email: String,
    hobbies: [String],
});

const DataMessage = mongoose.model('DataMessage',dataSchema);

export default DataMessage