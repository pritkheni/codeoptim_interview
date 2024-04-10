import { Schema, model } from "mongoose";

const roleSchema = new Schema({
  roleName: { type: String, required: true, unique: true },
  roleCode: { type: Number, required: true, unique: true },
});

const Role = model("Role", roleSchema);
export default Role;
