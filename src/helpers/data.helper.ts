import { connect } from "mongoose";
import getEnv from "./dotenv.helper";

export async function connectToMongoDb(): Promise<typeof import("mongoose")> {
    return connect(getEnv().MONGO_HOST)
}