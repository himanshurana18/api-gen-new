import { Schema, models, model } from "mongoose";

    const KajuSchema = new Schema({
       title: {type: String, datatype: "textinput"},
 content: {type: String, datatype: "textarea"},
 endDate: {type: Date, datatype: "inputdate", enum: []},
 seoTitle: {type: String, datatype: "textinput"},
 seoDescription: {type: String, datatype: "textarea"},
 focusKeywords: [ { type: String, datatype: "creatableselectmulti" } ],
 canonicalUrl: {type: String, datatype: "stringweblink"},
 metaRobots: {type: String, datatype: "singleselect"},
 openGraphTitle: {type: String, datatype: "singleselect"},
 openGraphDescription: {type: String, datatype: "textarea"}
    }, { timestamps: true });

    export const Kaju = models.Kaju || model("Kaju", KajuSchema, 'kajus');