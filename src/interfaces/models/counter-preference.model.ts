import { model, Schema, Model, Document } from "mongoose";
import { CounterType } from "../enum/counter-type";

export interface ICounterPreference extends Document {
    counterType: CounterType
    channelId: string;
    guildId: string;
}

const CounterPreferenceSchema = new Schema({
    counterType: { type: String, required: true },
    channelId: { type: String, required: true },
    guildId: { type: String, required: true }

})

const CounterPreference: Model<ICounterPreference> = model('CounterPreference', CounterPreferenceSchema)
export default CounterPreference;