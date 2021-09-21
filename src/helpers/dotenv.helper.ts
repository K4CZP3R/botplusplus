import Env from "../interfaces/env.interface";

export default function getEnv(): Env {
    return process.env as unknown as Env
}