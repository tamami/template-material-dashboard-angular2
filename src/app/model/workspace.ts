import { model, Schema } from "mongoose";

interface IWorkspace {
    workspaceName: string;
    user: string;
    spatialData: string;
}

const wsSchema = new Schema<IWorkspace>({
    workspaceName: { type: String, required: true },
    user: { type: String, required: true },
    spatialData: { type: String, required: true }
})

export const Workspace = model<IWorkspace>('workspaces', wsSchema)
