import express from 'express';
import  {getdata, createdata, updatedata, deletedata, sendMail } from "../controllers/data.js";

const router = express.Router();

router.get('/', getdata);
router.post('/', createdata);
router.put('/:id', updatedata);
router.delete('/:id', deletedata);
router.post('/send-mail', sendMail);

export default router;