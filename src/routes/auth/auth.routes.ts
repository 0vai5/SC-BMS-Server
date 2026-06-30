import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
} from "../../controllers/auth/auth.controller";
import { authGuard } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginUser);
router.get("/me", authGuard, getCurrentUser);

export default router;
