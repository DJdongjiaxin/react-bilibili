import { getJSON, postJSON } from "./fetch";
import {
  URL_VIDEO_DETAIL,
  URL_PLAY_URL,
  URL_VIDEO_RECOMMEND,
  URL_VIDEO_REPLAY,
  URL_VIDEO_BARRAG,
  URL_SEND_VIDEO,
  URL_GET_VIDEO_INFO,
  URL_SEARCH_VIDEO,
  URL_VIDEO_INFO,
  URL_GET_ALL_COMMENTS
} from "./url";

/**
 * 获取视频信息
 */
export function getVideoInfo(aId: number) {
  return getJSON(URL_VIDEO_DETAIL + `/${aId}`, null);
}

/**
 * 获取视频播放地址
 */
export function getPlayUrl(aId: number, cId: number) {
  return getJSON(URL_PLAY_URL + `?aId=${aId}&cId=${cId}`, null);
}

/**
 * 获取推荐视频列表
 */
export function getRecommendVides(aId: number) {
  return getJSON(URL_VIDEO_RECOMMEND + `/${aId}`, null);
}

/**
 * 获取评论列表
 */
export function getComments(aId: number, p: number) {
  return getJSON(URL_VIDEO_REPLAY, { aId, p });
}

/**
 * 获取弹幕
 */
export function getBarrages(cId: number) {
  return getJSON(URL_VIDEO_BARRAG + `/${cId}`, null)
}

/**
 * 查询用户投稿视频
 */
export function getVideo(number) {
  return getJSON(URL_GET_VIDEO_INFO, { number });
}

/**
 * 搜索视频
 */
export function searchVideo(keyword) {
  return getJSON(URL_SEARCH_VIDEO, { keyword });
}

/**
 * 查询视频详情信息
 */
export function videoInfo(vid) {
  return getJSON(URL_VIDEO_INFO, { vid });
}

/**
 * 查询当前视频的所有评论
 */
export function getAllComments(vid) {
  return getJSON(URL_GET_ALL_COMMENTS, { vid });
}