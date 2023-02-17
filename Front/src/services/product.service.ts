import http from "../http-common";
import IProductData from "../types/product.type";

class ProductDataService {
  getAll() {
    return http.get<Array<IProductData>>("/products");
  }

  get(id: string) {
    return http.get<IProductData>(`/products/${id}`);
  }

  create(data: IProductData) {
    return http.post<IProductData>("/products", data);
  }

  update(data: IProductData, id: any) {
    return http.put<any>(`/products/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/products/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/products`);
  }

  findByName(name: string) {
    return http.get<Array<IProductData>>(`/products?name=${name}`);
  }
}

export default new ProductDataService();