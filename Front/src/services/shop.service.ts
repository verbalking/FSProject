import http from "../http-common";
import IShopData from "../types/shop.type";

class ShopDataService {
  getAll() {
    return http.get<Array<IShopData>>("/shops");
  }

  get(id: string) {
    return http.get<IShopData>(`/shops/${id}`);
  }

  create(data: IShopData) {
    return http.post<IShopData>("/shops", data);
  }

  update(data: IShopData, id: any) {
    return http.put<any>(`/shops/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/shops/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/shops`);
  }

  findByName(name: string) {
    return http.get<Array<IShopData>>(`/shops?name=${name}`);
  }
}

export default new ShopDataService();