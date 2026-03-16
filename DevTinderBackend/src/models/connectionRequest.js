const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: "string",
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: "{VALUE} isincorrected status type",
      },
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

// Compund Index for faster queries in DB
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send connection request to yourself");
  }
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
