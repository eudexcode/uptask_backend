import mongoose, { Schema, Document, PopulatedDoc, Types, ObjectId} from "mongoose";
import { ITask } from "./Task";

export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: string;
    tasks: PopulatedDoc<ITask & Document>[];
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: "Task"
        }
    ]
}, {
    timestamps: true
})

const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;