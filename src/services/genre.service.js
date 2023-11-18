import createApiClient from "./api.service";
class GenreService {
  constructor(baseUrl = "https://zany-erin-betta-coat.cyclic.app/api/genres") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/new", data)).data;
  }
  async update(id, data) {
    return (await this.api.patch(`/update/${id}`, data)).data;
  }
  async deleteOne(id) {
    return (await this.api.delete(`/delete/${id}`)).data;
  }
}
export default new GenreService();
