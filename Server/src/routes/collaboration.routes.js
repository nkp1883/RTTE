import express from "express";
import auth from "../middlewares/auth.js";
import { getMyCollaborators } from "../controllers/collaboration.controller.js";

const router = express.Router();

router.get("/collaborators", auth, getMyCollaborators);

export default router;
