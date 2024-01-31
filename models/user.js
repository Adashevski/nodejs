import User from "./schemas/userSchema.js";

export const createUser = ({ email, password, subscription }) => {
  const newUser = new User({ email, password, subscription });
  return newUser.save();
};

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const findUserById = (id) => {
  return User.findById(id);
};

export const updateUserToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token });
};
