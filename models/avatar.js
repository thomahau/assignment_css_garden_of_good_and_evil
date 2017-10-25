const data = require('../data/data.json');

const getAvatarId = (alignment, insanity) => {
  let id;
  if (alignment === 'good' && insanity <= 50) {
    id = 'lawfulGood';
  } else if (alignment === 'good' && insanity > 50) {
    id = 'chaoticGood';
  } else if (alignment === 'evil' && insanity <= 50) {
    id = 'lawfulEvil';
  } else if (alignment === 'evil' && insanity > 50) {
    id = 'chaoticEvil';
  }
  return id;
};

const getAvatar = id => {
  let avatar;
  if (id === 'lawfulGood') {
    avatar = data['good'][id];
  } else if (id === 'chaoticGood') {
    avatar = data['good'][id];
  } else if (id === 'lawfulEvil') {
    avatar = data['evil'][id];
  } else if (id === 'chaoticEvil') {
    avatar = data['evil'][id];
  }
  return avatar;
};

module.exports = {
  getAvatarId,
  getAvatar
};
