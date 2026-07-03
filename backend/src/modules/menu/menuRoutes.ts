import { Router } from "express";
import controller from "./menuComposition";

const router = Router();

router.get("/", controller.getAll);
router.get("/resto/:id", controller.getByRestoId);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;