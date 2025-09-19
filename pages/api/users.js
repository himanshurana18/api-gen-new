import { dbConnect } from "../../lib/dbConnect";
import { User } from "../../models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { email } = req.query;

      if (email) {
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      }

      const users = await User.find({}).select('-password');
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}