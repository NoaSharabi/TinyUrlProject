import mongoose from "mongoose";
const clickSchema = new mongoose.Schema({
  insertedAt: { type: Date, default: Date.now },
  ipAddress: String,
  targetParamValue: String
});
const linkSchema = mongoose.Schema({
    originalUrl: {
    type: String,
    required: true,
    default: "new link"
  },
  clicks: [clickSchema],
  targetParamName: { type: String, default: 't' },
  targetValues: [
      {
          name: String,
          value: String
      }
  ]
});

export default mongoose.model("links", linkSchema);