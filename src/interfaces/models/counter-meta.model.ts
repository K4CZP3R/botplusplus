import { model, Schema, Model, Document } from "mongoose";

export interface ICounterMeta extends Document {
    counterValue: number;
    countedByUserId: string;
    channelId: string;
    guildId: string;
}

const CounterMetaSchema = new Schema({
    counterValue: { type: Number, required: true },
    countedByUserId: { type: String, required: false },
    channelId: { type: String, required: true },
    guildId: { type: String, required: true }

})

const CounterMeta: Model<ICounterMeta> = model('CounterMeta', CounterMetaSchema)
export default CounterMeta;