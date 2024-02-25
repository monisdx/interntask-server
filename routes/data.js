import express from 'express';
import  {getdata, createdata, updatedata, deletedata } from "../controllers/data.js";

const router = express.Router();

router.get('/', getdata);
router.post('/', createdata);
router.put('/:id', updatedata);
router.delete('/:id', deletedata);

export default router;