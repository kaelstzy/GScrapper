/*
 * Name: TikTok List Video
 * Creator: Kaelzyy
 * Platform: TikTok
 * Library: Axios
 * Last Updated: 05-10-2026
 *
 * Don't delete credits.
 */

const axios = require('axios');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/150 Mobile Safari/537.36',
  Referer: 'https://www.tiktok.com/',
  Accept: 'application/json'
};

async function fetchLatestVideo(secUid, userId) {
  const params = {
    aid: '1284',
    app_id: '1180',
    app_language: 'id-ID',
    app_name: 'tiktok_web',
    browser_language: 'id-ID',
    browser_name: 'Mozilla',
    browser_online: 'true',
    browser_platform: 'Linux aarch64',
    browser_version: '5.0',
    channel: 'tiktok_web',
    cookie_enabled: 'true',
    count: '5',
    cursor: '0',
    device_platform: 'web_mobile',
    os: 'android',
    from_page: 'user',
    list_type: '0',
    scene: '37',
    region: 'ID',
    tz_name: 'Asia/Jakarta',
    secUid,
    sec_uid: secUid,
    userId,
    user_is_login: 'false',
    web_id: '7667997834331358741',
    webcast_language: 'id-ID'
  };

  const { data } = await axios.get(
    'https://www.tiktok.com/api/reflow/post/item_list/',
    {
      params,
      headers: HEADERS,
      timeout: 15000
    }
  );

  const items = data?.item_list || [];

  if (!items.length) return null;

  const latest = [...items].sort(
    (a, b) =>
      (b.item_basic?.create_time || 0) -
      (a.item_basic?.create_time || 0)
  )[0];

  const basic = latest?.item_basic;
  const stats = latest?.item_stats;

  if (!basic) return null;

  const hashtags = (basic.text_extra || [])
    .filter(
      (item) =>
        item.hashtag_name &&
        item.hashtag_name.trim() !== ''
    )
    .map((item) => `#${item.hashtag_name}`);

  return {
    videoId: basic.id,
    createTime: basic.create_time,
    description: basic.desc || '',
    nickname: basic.creator?.base?.nick_name || '-',
    uniqueId: basic.creator?.base?.unique_id || '',
    cover:
      basic.video?.video_cover?.origin_cover?.[0] ||
      basic.video?.video_cover?.cover?.[0] ||
      null,
    hashtags: hashtags,
    playCount: stats?.play_count ?? 0,
    diggCount: stats?.digg_count ?? 0,
    commentCount: stats?.comment_count ?? 0
  };
}

module.exports = { fetchLatestVideo };
