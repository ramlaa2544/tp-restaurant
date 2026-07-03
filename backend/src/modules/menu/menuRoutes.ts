import { Router } from "express";
import controller from "./menuComposition";

const router = Router();

router.get("/", controller.getAll);
router.get("/:restoId", controller.getByRestoId);

export default router;