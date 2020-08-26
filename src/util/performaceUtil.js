
// 防抖函数
export function debounce(handle, delay){
  let timer = null;
  return function (){
    let _this = this;
    let _args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      handle.apply(_this, _args);
    }, delay);
  }
}

// 节流函数
export function throttle(handle, wait){
  let lasttime = 0;
  return function (){
    let _this = this;
    let _args = arguments;
    let nowtime = new Date().getTime();
    if (nowtime - lasttime > wait){
      handle.apply(_this, _args);
    }
  }
}
