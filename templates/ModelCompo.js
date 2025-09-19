export const generateModelCode = (modelName, fields) => {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const ModelName = capitalizeFirstLetter(modelName);

  return `
    import { Schema, models, model } from "mongoose";

    const ${ModelName}Schema = new Schema({
      ${fields}
    }, { timestamps: true });

    export const ${ModelName} = models.${ModelName} || model("${ModelName}", ${ModelName}Schema, '${modelName.toLowerCase()}s');




    
  `.trim();
};
