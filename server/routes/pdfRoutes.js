import express from 'express';
import { uploadPDF, getUserPDFs, deletePDF } from '../controllers/pdfController.js';
import upload from '../middlewares/multer.js';

const pdfRouter = express.Router();

pdfRouter.post('/:userId/upload', upload.single('pdf'), uploadPDF);
pdfRouter.get('/:userId/pdfs', getUserPDFs);
pdfRouter.delete('/:userId/pdfs/:pdfId', deletePDF);

export default pdfRouter;