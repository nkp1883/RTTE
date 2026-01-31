import express from "express";
import auth from "../middlewares/auth.js";
import { createDocument, deleteDocument, getDocumentById, listUserDocuments } from "../controller/document.controller.js";
const documentRouter = express.Router();


// Create document
documentRouter.post("/documents", auth, createDocument);

// Get document by ID
documentRouter.get("/documents/:id", auth,getDocumentById );

// List documents for logged-in user
documentRouter.get("/documents", auth, listUserDocuments);

documentRouter.delete("/documents/:id", auth, deleteDocument);


export default documentRouter


