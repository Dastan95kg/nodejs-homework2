import { Router } from "express";

import { UserController } from "../controllers/user.controller.js";

const router = Router();

router.post("/", UserController.createUser);

router.get("/", UserController.getUsersList);

router.get("/:id", UserController.getUserById);

router.put("/:id", UserController.updateUserById);

router.delete("/:id", UserController.deleteUserById);

export default router;
