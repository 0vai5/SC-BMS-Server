import Router from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../../controllers/user/user.controller";
import { authGuard } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authGuard);

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

export default router;
