import { Router } from "express";
import controller from "./categorieComposition";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

export default router;