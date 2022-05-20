const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const coquiSchema = new Schema(
  {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    cheatsheets: [ {type: Schema.Types.ObjectId, ref: 'CheatSheet'}]
  },
  {
    timestamps: true,
  }
);

const Coqui = model("Coqui", coquiSchema);

module.exports = Coqui;
