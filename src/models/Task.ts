import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
    PENDING: "PENDING",
    ON_HOLD: "ON_HOLD",
    IN_PROGRESS: "IN_PROGRESS",
    UNDER_REVIEW: "UNDER_REVIEW",
    COMPLETED: "COMPLETED"
} as const;

const taskPriority = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    CRITICAL: "CRITICAL"
} as const;

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];
export type TaskPriority = typeof taskPriority[keyof typeof taskPriority];

export interface ITask extends Document {
    title: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
    priority: TaskPriority;
/*     assignedTo: Types.ObjectId;
    assignedBy: Types.ObjectId;
    assignedDate: Date;  */
}

export const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId,
        ref: "Project",
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    priority: {
        type: String,
        enum: Object.values(taskPriority),
        default: taskPriority.LOW
    }
/*     assignedTo: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    },
    assignedBy: {
        type:  Types.ObjectId,
        ref: "User",
        required: true,
        trim: true
    },
    assignedDate: {
        type: Date,
        required: true,
        trim: true
    }  */
}, {
    timestamps: true
})

const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;