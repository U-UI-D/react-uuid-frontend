export default class DateTimeUtils{

  // 日期
  static getFormatDate(date){
    let originDate = new Date(date);
    return originDate.toLocaleDateString().replace(/\//g, "-");
  }

  // 获取时间
  static getFormatTime(date){
    let originDate = new Date(date);
    let h = (originDate.getHours() < 10) ? "0" + originDate.getHours() : originDate.getHours();
    let m = (originDate.getMinutes() < 10) ? "0" + originDate.getMinutes() : originDate.getMinutes();
    let s = (originDate.getSeconds() < 10) ? "0" + originDate.getSeconds() : originDate.getSeconds();
    return h + ":" + m + ":" + s;
  }

  // 获取时间和日期
  static getFormatDateTime(date, timeGap = 0){
    date = this.addTimeGap(date, timeGap);
    return this.getFormatDate(date) + " " + this.getFormatTime(date);
  }

  // 获取多少时间前（x秒前、x分钟前、x小时前、x天前...）
  static getFormerTime(date){
    let gap = parseInt(new Date().getTime() - new Date(date).getTime());
    let res = "";
    let min = 1000 * 60;
    let hour = 1000 * 60 * 60;
    let day = 1000 * 60 * 60 * 24;
    if (gap < 2000){
      res = "刚刚";
    } else if (gap < min){
      res = Math.floor((gap / 1000)) +  "秒前";
    } else if (gap > min && gap < hour){
      res = Math.floor((gap / 60000)) +  "分钟前";
    } else if (gap > hour && gap < day) {
      res = Math.floor((gap / 3600000)) +  "小时前";
    } else if (gap < day * 3) {
      res = Math.floor((gap / day)) +  "天前";
    } else {
      return date.replace(/\//g, "-");
    }
    return res;
  }

  static addTimeGap(date, gap = 8){
    return new Date(new Date(date).getTime() + (1000 * 60 * 60 * gap));
  }
}
