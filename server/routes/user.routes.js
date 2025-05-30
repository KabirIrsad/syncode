import express from "express";
import { goToHomePage, goToRoom } from "../controllers/user.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id/home", protectRoute, goToHomePage);

router.get("/:id/:roomId", protectRoute, goToRoom);

export default router;