import http from "../http-common";
import ICategoryData from "../types/category.type";

class CategoryDataService {
  getAll() {
    return http.get<Array<ICategoryData>>("/categories");
  }

  get(id: string) {
    return http.get<ICategoryData>(`/categories/${id}`);
  }

  create(data: ICategoryData) {
    return http.post<ICategoryData>("/categories", data);
  }

  update(data: ICategoryData, id: any) {
    return http.put<any>(`/categories/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/categories/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/categories`);
  }

  findByName(name: string) {
    return http.get<Array<ICategoryData>>(`/categories?name=${name}`);
  }
}

export default new CategoryDataService();