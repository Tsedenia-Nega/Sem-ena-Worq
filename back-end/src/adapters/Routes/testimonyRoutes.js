import express from 'express';
import TestimonialController from '../controllers/testimoneycontroller.js';
import TestimonialRepository from '../../Repositories/testimoneyRepo.js';
import authMiddleware from '../../adapters/Middlewares/AuthMiddleware.js';
import upload from '../Middlewares/imageMiddleware.js';


const repo = new TestimonialRepository();
const controller = new TestimonialController(repo);
const Middlware = new authMiddleware(repo);

const router = express.Router();


router.post('/create',Middlware.authMiddleware, Middlware.adminOnlyMiddleware,upload.single("image"), (req, res) => controller.createTestimonial(req, res)); 
router.get('/get', (req, res) => controller.listTestimonials(req, res));  
router.get("/get/:id", (req, res) =>
    controller.getTestimonialById(req, res)
);
router.patch('/edit/:id',Middlware.authMiddleware, Middlware.adminOnlyMiddleware,upload.single("image"), (req, res) => controller.updateTestimonial(req, res)); 
router.delete('/delete/:id',Middlware.authMiddleware, Middlware.adminOnlyMiddleware, (req, res) => controller.deleteTestimonial(req, res)); 
export default router;
