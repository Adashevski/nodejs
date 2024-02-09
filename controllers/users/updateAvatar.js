import jimp from "jimp";
import User from "../../models/schemas/userSchema.js";
import path from "path";
import fs from "fs/promises";
import { AVATARS_FOLDER, TMP_FOLDER } from "../../utilities/foldersPath.js";

export async function updateAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No avatar uploaded" });
    }

    const avatarPath = path.join("tmp", req.file.filename);
    const avatar = await jimp.read(avatarPath);
    await avatar.cover(250, 250).writeAsync(avatarPath);

    const newAvatarFileName = `${req.user._id.toString()}.jpg`;
    const newAvatarPath = path.join(AVATARS_FOLDER, newAvatarFileName);
    await fs.rename(avatarPath, newAvatarPath);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.avatarURL = `/avatars/${newAvatarFileName}`;
    await user.save();

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
