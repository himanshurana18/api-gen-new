import { dbConnect } from "../../../lib/dbConnect";
import { User } from "../../../models/User";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await dbConnect();

    const { firstname, lastname, email, password, avtar, _id } = req.body;

    // Check if user is demo user
    const currentUser = await User.findById(_id);
    if (currentUser && currentUser.userRole === 'demo') {
      return res.status(403).json({ message: "Permission denied to Demo User." });
    }

    const updateData = {
      firstname,
      lastname,
      email,
      avtar
    };

    // Only update password if provided
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        avtar: updatedUser.avtar,
        userRole: updatedUser.userRole
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}