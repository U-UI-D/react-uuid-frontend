// 获取轮播图列表
import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class CarouselService {
  static async getCarouselList() {
    let promise = HttpRequest.get({
      url: ApiConst.carousel.get.GET_CAROUSEL_ALL,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }
}


