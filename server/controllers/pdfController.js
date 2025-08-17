import User from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';

export const uploadPDF = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Upload PDF to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'user_pdfs',
      resource_type: 'raw',
    });

    // Save PDF details to User
    user.pdfs.push({
      public_id: result.public_id,
      url: result.secure_url,
      filename: req.file.originalname,
    });

    await user.save();

    res.status(201).json({
      message: 'PDF uploaded successfully!',
      pdf: {
        url: result.secure_url,
        filename: req.file.originalname,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPDFs = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.pdfs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePDF = async (req, res) => {
  try {
    const { userId, pdfId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const pdfIndex = user.pdfs.findIndex((pdf) => pdf._id.toString() === pdfId);

    if (pdfIndex === -1) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(user.pdfs[pdfIndex].public_id);

    // Remove from User's PDFs array
    user.pdfs.splice(pdfIndex, 1);
    await user.save();

    res.status(200).json({ message: 'PDF deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};