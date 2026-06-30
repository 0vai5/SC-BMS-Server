import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
} from "../../controllers/auth/auth.controller";

const router = Router();

router.post("/login", loginUser);
router.get("/me", getCurrentUser);

export default router;
