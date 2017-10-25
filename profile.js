const { getAvatarId, getAvatar } = require('./models/avatar');

const _amendLikes = (avatar, food, color) => {
  if (avatar['likes'].length === 5) {
    const customLikes = [food, `The color ${color}`];
    likes = avatar['likes'].concat(customLikes);
    likes = likes.filter(like => like !== undefined);
    likes = Array.from(new Set(likes));
    avatar.likes = likes;
  }
  return avatar;
};

const profile = (req, res, next) => {
  const { alignment, insanity } = req.body;
  let food = req.body.food || req.cookies.food;
  let color = req.body.color || req.cookies.color;
  let id = getAvatarId(alignment, insanity) || req.cookies.id;
  let avatar = {};
  if (id !== undefined) {
    avatar = getAvatar(id);
    avatar = _amendLikes(avatar, food, color);
  }
  req.id = id;
  req.food = food;
  req.color = color;
  req.profile = avatar;
  next();
};

module.exports = profile;
