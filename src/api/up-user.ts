import { getJSON, postJSON } from "./fetch";
import {
  URL_UP_USER,
  URL_USER_VIDEO,
  URL_GET_USER_INFO,
  URL_USER_LOGIN,
  URL_USER_REGISTER,
  URL_ADD_FEEDBACK,
  URL_ADMIN_USERS,
  URL_ADMIN_COMMENTS,
  URL_ADMIN_VIDEOS,
  URL_ADMIN_FEEDBACK,
  URL_ADMIN_DELCOMMENT,
  URL_ADMIN_DELFEEDBACK,
  URL_ADMIN_DELUSER,
  URL_ADMIN_DELVIDEO,
  URL_ADMIN_EDITROLE
} from "./url";

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

/**
 * 用户反馈
 */
export function addFeedback(feedback?: string, uid?: string) {
  return getJSON(URL_ADD_FEEDBACK, { feedback, uid });
}

/**
 * 管理员功能--展示用户
 */
export function getUsers() {
  return getJSON(URL_ADMIN_USERS, {});
}

/**
 * 管理员功能--展示评论
 */
export function getComments() {
  return getJSON(URL_ADMIN_COMMENTS, {});
}

/**
 * 管理员功能--展示视频
 */
export function getVideos() {
  return getJSON(URL_ADMIN_VIDEOS, {});
}

/**
 * 管理员功能--展示反馈
 */
export function getFeedback() {
  return getJSON(URL_ADMIN_FEEDBACK, {});
}

/**
 * 管理员功能--删除用户
 */
export function delUser(id) {
  return getJSON(URL_ADMIN_DELUSER, { id });
}

/**
 * 管理员功能--删除评论
 */
export function delComment(id) {
  return getJSON(URL_ADMIN_DELCOMMENT, { id });
}

/**
 * 管理员功能--删除视频
 */
export function delVideo(id) {
  return getJSON(URL_ADMIN_DELVIDEO, { id });
}

/**
 * 管理员功能--删除反馈
 */
export function delFeedback(id) {
  return getJSON(URL_ADMIN_DELFEEDBACK, { id });
}

/**
 * 管理员功能--修改角色
 */
export function editRole(role, id) {
  return getJSON(URL_ADMIN_EDITROLE, { role, id });
}