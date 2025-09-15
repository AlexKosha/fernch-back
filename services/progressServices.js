import { ProgressModel } from "../models/progressModal.js";

export const userProgressUnique = async (userId) =>
  await ProgressModel.findOne({ userId }, { _id: 0 });

export const addProgressDB = async (userId, progress) => {
  const newProgressDoc = await ProgressModel.create({ userId, progress });

  // Повертаємо plain object без _id і метаданих
  return {
    userId: newProgressDoc.userId,
    progress: newProgressDoc.progress,
  };
};

export const updateProgressThemesDB = async (userId, progress) => {
  const updated = await ProgressModel.findOneAndUpdate(
    { userId },
    { $set: { progress } },
    { new: true }
  );

  if (!updated) return null;

  const updatedObj = updated.toObject(); // конвертуємо в звичайний JS обʼєкт
  delete updatedObj._id; // видаляємо поле _id

  return updatedObj;
};

export const deleteProgress = async (userId) => {
  return await ProgressModel.deleteOne({ userId });
};
