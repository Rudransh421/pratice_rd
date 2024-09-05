import mongoose from "mongoose";

const subscriptionSchema = await mongoose.Schema({
    subscriber:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    channel:{
        type: mongoose.Schema.Types.ObjectId, // one to whom Subscriber is subscribing
        ref: "User",
    }
}, { timestramps: true });

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
