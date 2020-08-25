
export function getCookieByName (cookieName) {
  let cookieArr = document.cookie.split(";");
  let value = "";
  for (let i = 0; i < cookieArr.length; i++) {
    cookieArr[i] = cookieArr[i].trim();
    let cname = cookieArr[i].split("=")[0];
    let cvalue = cookieArr[i].split("=")[1];
    if (cname === cookieName){
      value = cvalue;
      break;
    }
  }
  return value ? value : undefined;
}


export function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 如果需要，可以在这里添加其他默认值
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
