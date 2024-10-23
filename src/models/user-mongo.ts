import mongoose, { Schema } from "mongoose";

enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
}

export interface IUser {
  name: string;
  email: string;
  status?: UserStatus;
  createdAt?: Date;
}
const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
