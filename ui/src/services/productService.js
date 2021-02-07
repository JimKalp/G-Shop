import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

class ProductService {
  add = async (price, description, category) => {
    try {
      const res = await axios.post("/products/add", {
        price,
        description,
        category,
      });
      return res.data;
    } catch (error) {}
  };

  get = async (f) => {
    try {
      const res = await axios.get("/products");
      console.log(res.data);
      f(res.data);
      return res.data;
    } catch (error) {}
  };
}

export default new ProductService();
