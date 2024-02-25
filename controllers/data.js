import DataMessage from "../models/data.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { formatTable } from "../utils.js";

export async function getdata(req, res) {
  try {
    const data = await DataMessage.find();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function createdata(req, res) {
  const { name, email, phonenumber, hobbies } = req.body;

  try {
  const data = await DataMessage.find({$or:[{email},{phonenumber}]});

  if(data.length>0){
    return res.json({message: 'already exist entry'});
  }

  const newData = new DataMessage({ name, email, phonenumber, hobbies });
 
    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export async function deletedata(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no data with that id");

  await DataMessage.deleteOne({ _id: id });

  res.json({ message: "Data detected successfully" });
}

export async function updatedata(req, res) {
  const { id } = req.params;
  const { name, email, phonenumber, hobbies } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedData = { name, email, phonenumber, hobbies, _id: id };

  await DataMessage.findByIdAndUpdate(id, updatedData, { new: true });

  res.json(updatedData);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(req, res) {
  const { email, ids } = req.body;
  console.log(email, ids);

  function getTd(data) {
    return `<td style="padding:6px; border: 1px solid #1a1a1a">${data}</td>`;
  }

  var content = "";
  var html = `
  <table>
    <tr>
        ${getTd("Name")}
        ${getTd("Email")}
        ${getTd("Phone Number")}
        ${getTd("Hobbies")}
    </tr>
  `;

  const items = [];

  for await (let id of ids) {
    const data = await DataMessage.findById(id);
    items.push(data);

    html += `
    <tr>
        ${getTd(data.name)}
        ${getTd(data.phonenumber)}
        ${getTd(data.email)}
        ${getTd(data.hobbies.join(", "))}
    </tr>
    `;
  }

  content = formatTable(items);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email.toString(),
    subject: "Intern Task - Selected Data",
    // text: "Expand for details",
    html: html + `</table>`,
  };

  await transporter.sendMail(mailOptions).catch((err) => console.error(err));

  return res.status(200).send({ code: 0, message: "successful" });
}
