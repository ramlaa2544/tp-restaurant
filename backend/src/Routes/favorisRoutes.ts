import { Router } from "express";
import controller from "../composition/favorisComposition";

const router = Router();

router.get("/", controller.getAll);
router.post("/:restaurantId", controller.ajouter);
router.delete("/:restaurantId", controller.supprimer);
router.delete("/", controller.vider);

export default router;
