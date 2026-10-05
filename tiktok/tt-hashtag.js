/*
 * Name: TikTok Hashtag
 * Creator: Kaelzyy
 * Platform: TikTok
 * Library: Axios
 * Last Updated: 05-10-2026
 *
 * Don't delete credits.
 */

const axios = require('axios');

async function getHashtag(tag) {
  const cleanTag = tag.replace(/^#/, '');

  const res = await axios.get(
    `https://www.tiktok.com/api/challenge/detail/?challengeName=${encodeURIComponent(cleanTag)}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    }
  );

  const data = res.data;
  const info = data?.challengeInfo;

  if (!info) {
    throw new Error(`Hashtag #${cleanTag} tidak ditemukan`);
  }

  const challenge = info.challenge || {};
  const stats = info.statsV2 || {};

  return {
    id: challenge.id || null,
    title: challenge.title || cleanTag,
    description: challenge.desc || '',
    videoCount: stats.videoCount || '0',
    viewCount: stats.viewCount || '0'
  };
}

module.exports = { getHashtag };
