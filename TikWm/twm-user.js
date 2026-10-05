/*
 * Name: TikWM User Info
 * Creator: Kaelzyy
 * Platform: TikWM
 * Library: Axios
 * Last Updated: 05-10-2026
 *
 * Don't delete credits.
 */

const axios = require('axios');

async function fetchTikTokUser(username) {
  const res = await axios.get(
    `https://www.tikwm.com/api/user/info/?unique_id=${encodeURIComponent(username)}`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 15000
    }
  );

  const data = res.data?.data;

  if (!data?.user) {
    throw new Error('User tidak ditemukan atau akun privat');
  }

  const { user, stats } = data;

  return {
    user: {
      nickname: user.nickname,
      uniqueId: user.uniqueId,
      signature: user.signature,
      verified: user.verified,
      privateAccount: user.secret,
      createTime: user.createTime,
      avatarLarger: user.avatarLarger
    },
    stats: {
      followerCount: stats?.followerCount ?? 0,
      followingCount: stats?.followingCount ?? 0,
      heartCount: stats?.heartCount ?? 0,
      videoCount: stats?.videoCount ?? 0
    }
  };
}

module.exports = { fetchTikTokUser };
