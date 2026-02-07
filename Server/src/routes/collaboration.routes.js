import express from "express";
import auth from "../middlewares/auth.js";
import { getMyCollaborators } from "../controller/collaboration.controller.js";

const collaborationRoutes = express.Router();

collaborationRoutes.get("/collaborators", auth, getMyCollaborators);

export default collaborationRoutes;
