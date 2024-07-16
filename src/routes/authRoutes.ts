import { Router } from 'express';
import AuthController from '../controllers/authController';

class AuthRoutes {
    public router: Router;
    
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
    
    private initializeRoutes(): void {
        const apiRouter = Router();
        this.router.use('/api', apiRouter);
        apiRouter.post('/login', AuthController.login);
    }
    }

export default new AuthRoutes().router;