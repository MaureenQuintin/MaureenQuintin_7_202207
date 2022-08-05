const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, required: true, default : 0 },
  usersLiked: { type: [String], required: true, default: []},
},
{
  timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);