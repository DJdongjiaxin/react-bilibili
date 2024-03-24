import { getJSON, postJSON } from "./fetch";
import { URL_UP_USER, URL_USER_VIDEO, URL_GET_USER_INFO, URL_USER_LOGIN, URL_USER_REGISTER } from "./url";

/**
 * 获取up主信息
 */
export function getUserInfo(mId: number) {
  return getJSON(URL_UP_USER + `/${mId}`, null);
}

/**
 * 获取up主投稿视频
 */
export function getUserVideos(aId: number, p: number, size: number) {
  return getJSON(URL_USER_VIDEO, { uId: aId, p, size });
}



/**
 * 用户登录接口
 */
export function login(number?: string, password?: string) {
  return getJSON(URL_USER_LOGIN, { number, password });
}

/**
 * 用户注册接口
 */
export function register(username?: string, number?: string, password?: string) {
  return getJSON(URL_USER_REGISTER, { username, number, password });
}