import { dbConnect } from "../../lib/dbConnect";
import ModelSchema from "../../models/ModelSchema";
import { generateModelCode } from "../../lib/modelGenerator";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { model } = req.query;
      
      if (model) {
        // Get specific model
        const modelData = await ModelSchema.findOne({ 
          name: new RegExp(`^${model}$`, "i") 
        });
        
        if (!modelData) {
          return res.status(404).json({ message: "Model not found" });
        }
        
        return res.status(200).json(modelData);
      } else {
        // Get all models
        const models = await ModelSchema.find({}).sort({ createdAt: -1 });
        return res.status(200).json(models);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      return res.status(500).json({ message: "Error fetching models", error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const { modelName, fields } = req.body;

      if (!modelName) {
        return res.status(400).json({ message: "Model name is required" });
      }

      // Check if model already exists
      const existingModel = await ModelSchema.findOne({ 
        name: new RegExp(`^${modelName}$`, "i") 
      });

      if (existingModel) {
        return res.status(409).json({ message: "Model already exists" });
      }

      // Create model in database
      const newModel = await ModelSchema.create({
        name: modelName,
        fields: fields || []
      });

      // Generate model file
      if (fields && fields.length > 0) {
        const modelCode = generateModelCode({ name: modelName, fields });
        const capitalizedName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelPath = path.join(process.cwd(), "models", `${capitalizedName}.js`);
        
        fs.writeFileSync(modelPath, modelCode);
      }

      return res.status(201).json(newModel);
    } catch (error) {
      console.error("Error creating model:", error);
      return res.status(500).json({ message: "Error creating model", error: error.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { modelName, fields } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Model ID is required" });
      }

      const updatedModel = await ModelSchema.findByIdAndUpdate(
        id,
        { name: modelName, fields },
        { new: true }
      );

      if (!updatedModel) {
        return res.status(404).json({ message: "Model not found" });
      }

      // Regenerate model file
      if (fields && fields.length > 0) {
        const modelCode = generateModelCode({ name: modelName, fields });
        const capitalizedName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
        const modelPath = path.join(process.cwd(), "models", `${capitalizedName}.js`);
        
        fs.writeFileSync(modelPath, modelCode);
      }

      return res.status(200).json(updatedModel);
    } catch (error) {
      console.error("Error updating model:", error);
      return res.status(500).json({ message: "Error updating model", error: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Model ID is required" });
      }

      const deletedModel = await ModelSchema.findByIdAndDelete(id);

      if (!deletedModel) {
        return res.status(404).json({ message: "Model not found" });
      }

      // Delete model file
      const capitalizedName = deletedModel.name.charAt(0).toUpperCase() + deletedModel.name.slice(1);
      const modelPath = path.join(process.cwd(), "models", `${capitalizedName}.js`);
      
      if (fs.existsSync(modelPath)) {
        fs.unlinkSync(modelPath);
      }

      return res.status(200).json({ message: "Model deleted successfully" });
    } catch (error) {
      console.error("Error deleting model:", error);
      return res.status(500).json({ message: "Error deleting model", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}