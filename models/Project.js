import { Schema, models, model } from "mongoose";

    const ProjectSchema = new Schema({
       projectName: {type: String, datatype: "textinput"},
 status: {type: Boolean, datatype: "toggleinput"},
 endDate: {type: Date, datatype: "inputdate", enum: []},
 something: {type: String, datatype: "textarea", enum: []},
 para: {type: String, datatype: "textarea", enum: []},
 something2: {type: String, datatype: "textinput", enum: []},
 dkkd: {type: String, datatype: "textarea", enum: []},
 skdj: {type: String, datatype: "textinput", enum: []},
 dnd: {type: String, datatype: "textinput", enum: []},
 seoTitle: {type: String, datatype: "textinput"},
 seoDescription: {type: String, datatype: "textarea"},
 focusKeywords: [ { type: String, datatype: "creatableselectmulti" } ],
 canonicalUrl: {type: String, datatype: "stringweblink"},
 metaRobots: {type: String, datatype: "singleselect"},
 openGraphTitle: {type: String, datatype: "singleselect"},
 openGraphDescription: {type: String, datatype: "textarea"}
    }, { timestamps: true });

    export const Project = models.Project || model("Project", ProjectSchema, 'projects');