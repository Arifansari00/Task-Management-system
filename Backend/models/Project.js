const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Project', ProjectSchema);