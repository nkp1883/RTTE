import Document from "../models/document.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const getMyCollaborators = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // 1️⃣ Find all documents where user is involved
    const documents = await Document.find({
      $or: [
        { owner: userId },
        { collaborators: userId },
      ],
    });

    // 2️⃣ Collect collaborator IDs
    const collaboratorSet = new Set();

    documents.forEach((doc) => {
      // owner
      if (doc.owner.toString() !== userId.toString()) {
        collaboratorSet.add(doc.owner.toString());
      }

      // collaborators
      doc.collaborators.forEach((collabId) => {
        if (collabId.toString() !== userId.toString()) {
          collaboratorSet.add(collabId.toString());
        }
      });
    });

    const collaboratorIds = Array.from(collaboratorSet);

    // 3️⃣ Fetch user details
    const collaborators = await User.find(
      { _id: { $in: collaboratorIds } },
      { password: 0 } // hide sensitive fields
    );

    res.status(200).json(collaborators);
  } catch (error) {
    console.error("GET COLLABORATORS ERROR:", error.message);
    res.status(500).json({
      message: "Failed to fetch collaborators",
    });
  }
};
