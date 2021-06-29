import mongoose from 'mongoose';

const warnsSchema = new mongoose.Schema({
      guild: { type: String, required: true, unique: true },
      user: { type: String, required: true, unique: true },
      botWarns: { type: Number, required: true, unique: true, default: 0 },
      humanWarns: { type: Number, required: true, unique: true, default: 0 },
});

export default mongoose.model('Warns', warnsSchema, 'Warns');
