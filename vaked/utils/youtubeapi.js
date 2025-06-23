const axios = require("axios");

async function isValidYouTubeChannel(url, apiKey) {
  try {
    let channelId = null;

    if (url.includes("/channel/")) {
      // ✅ Extract UCxxxxxxxx
      channelId = url.split("/channel/")[1].split(/[/?]/)[0];
    } else {
      // ❌ Reject handles, custom URLs etc.
      return false;
    }

    if (!channelId.startsWith("UC")) return false;

    // ✅ Now verify channel via YouTube API
    const channelRes = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
      params: {
        part: "id",
        id: channelId,
        key: apiKey,
      },
    });

    return channelRes.data.items && channelRes.data.items.length > 0;
  } catch (err) {
    console.error("YouTube channel validation error:", err.message);
    return false;
  }
}
module.exports=isValidYouTubeChannel;