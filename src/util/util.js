/**
 * 从LocalStorage获取数据
 * @param itemName
 * @returns {any}
 */
export function getItemFromLocalStorage(itemName) {
  let item = localStorage.getItem(itemName);
  return JSON.parse(item);
}

/**
 * 从LocalStorage获取用户信息
 * @returns {any}
 */
export function getUserInfoFromLocalStorage() {
  let userInfo = localStorage.getItem("userInfo");
  return JSON.parse(userInfo);
}
