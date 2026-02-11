import express from 'express';
import PortfolioController from '../controllers/PortfolioController.js';
import PortfolioRepository from '../../Repositories/portfolioRepo.js';
import authMiddleware from '../../adapters/Middlewares/AuthMiddleware.js';
import upload from '../../adapters/Middlewares/imageMiddleware.js';
 
const portfolioRepository = new PortfolioRepository();
const portfolioController = new PortfolioController(portfolioRepository);

const router = express.Router();

router.get("/get", (req, res) => portfolioController.listPortfolios(req, res));

router.get("/get/:id", (req, res) => portfolioController.getPortfolioById(req, res));

router.post("/create", authMiddleware, upload.single('image'), (req, res) => portfolioController.createPortfolio(req, res));


router.put("/update/:id", authMiddleware, upload.single('image'), (req, res) => portfolioController.updatePortfolio(req, res));

router.delete("/delete/:id", authMiddleware, (req, res) => portfolioController.deletePortfolio(req, res));


export default router;
