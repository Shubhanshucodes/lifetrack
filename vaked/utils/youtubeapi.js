const axios = require("axios");

async function isValidYouTubeChannel(url, apiKey) {
  try {
    let channelId = null;

    if (url.includes("/channel/")) {
      // Format: https://www.youtube.com/channel/UCxxxx
      channelId = url.split("/channel/")[1];
    } else if (url.includes("/@")) {
      // Format: https://www.youtube.com/@Handle
      const handle = url.split("/@")[1];

      // Use YouTube search API to search for the handle
      const searchRes = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: `@${handle}`,
          type: "channel",
          maxResults: 1,
          key: apiKey,
        },
      });

      if (
        searchRes.data.items &&
        searchRes.data.items.length > 0
      ) {
       channelId = searchRes.data.items[0].id.channelId;

      }
    }

    // Now verify the channelId
    if (!channelId) return false;

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

module.exports = isValidYouTubeChannel;
