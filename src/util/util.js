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
 * 从SessionStorage获取数据
 * @param itemName
 * @returns {any}
 */
export function getItemFromSessionStorage(itemName) {
  let item = sessionStorage.getItem(itemName);
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

export function getUserIdentity (identity) {
  switch (identity) {
    case "1":
    case 1: return "UI设计师";
    case "2":
    case 2: return "开发者";
    default: return "";
  }
}
