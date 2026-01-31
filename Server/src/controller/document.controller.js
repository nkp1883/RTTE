import Document from "../models/document.js";

export const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const document = await Document.create({
      title,
      content: content || "",
      owner: req.user.id,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: "Failed to create document" });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const userId = req.user.id;

    const isOwner = document.owner.toString() === userId;
    const isCollaborator = document.collaborators.some(
      (collabId) => collabId.toString() === userId
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch document" });
  }
};

export const listUserDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const documents = await Document.find({
      $or: [{ owner: userId }, { collaborators: userId }],
    }).sort({ updatedAt: -1 });

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Failed to list documents" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // 🔒 Only owner can delete
    if (document.owner.toString() !== userId) {
      return res.status(403).json({
        message: "Only owner can delete this document",
      });
    }

    await document.deleteOne();

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete document",
    });
  }
};

