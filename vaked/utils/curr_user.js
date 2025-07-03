function formatUserResponse(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    payment:user.payment,
    youtube: user.youtube,
    // add other public fields here
  };
}

module.exports = formatUserResponse;
