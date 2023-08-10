import mongoose from "mongoose"
import { MONGO_URI } from "../config/mongodb.config.js"

await mongoose.connect(MONGO_URI)
mongoose.connection.useDb('ecommerce')
export default mongoose