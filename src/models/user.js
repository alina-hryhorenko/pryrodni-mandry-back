import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
    articlesAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    savedArticles: {
      type: [Schema.Types.ObjectId],
      ref: 'Story',
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function () {
  if (!this.name) {
    this.name = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
