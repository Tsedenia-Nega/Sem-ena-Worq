import express from 'express';
import BlogController from '../../adapters/controllers/blogsController.js';
import BlogRepository from '../../Repositories/blogsRepo.js';
import authMiddleware from '../../adapters/Middlewares/AuthMiddleware.js';
import upload from '../../adapters/Middlewares/imageMiddleware.js';
const router = express.Router();

const blogRepository = new BlogRepository();
const blogController = new BlogController(blogRepository);
const Middlware = new authMiddleware(blogRepository);


router.post(
  "/create",
  upload.single("image"),        // 1. Multer FIRST (to catch the file)
  Middlware.authMiddleware,      // 2. Auth SECOND
  Middlware.adminOnlyMiddleware, // 3. Admin THIRD
  (req, res) => blogController.createBlog(req, res)
);

router.patch(
    '/edit/:blogId',
    Middlware.authMiddleware,
    Middlware.adminOnlyMiddleware,
    upload.single('image'), 
    (req, res) => blogController.updateBlog(req, res)
);

router.delete(
    '/delete/:blogId',
    Middlware.authMiddleware,
    Middlware.adminOnlyMiddleware,
    (req, res) => blogController.deleteBlog(req, res)
);
router.get(
  "/get/admin",
  Middlware.authMiddleware,
  Middlware.adminOnlyMiddleware,
  (req, res) => blogController.listBlogsAdmin(req, res),
);
router.get('/get/:blogId', (req, res) => blogController.getBlog(req, res));

router.get('/get', (req, res) => blogController.listBlogs(req, res));




router.post('/addComment/:blogId', (req, res) => blogController.addComment(req, res));

router.delete(
    '/deleteComment/:blogId/:commentId',
    Middlware.authMiddleware,
    Middlware.adminOnlyMiddleware,
    (req, res) => blogController.removeComment(req, res)
);

router.get('/getComments/:blogId', (req, res) => blogController.getComments(req, res));


router.post('/like/:blogId', (req, res) => blogController.addLike(req, res));
router.post('/dislike/:blogId', (req, res) => blogController.addDislike(req, res));

router.get('/likes/:blogId', (req, res) => blogController.getLikes(req, res));
router.get('/dislikes/:blogId', (req, res) => blogController.getDislikes(req, res));

export default router;
