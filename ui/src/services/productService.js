import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

class ProductService {
  add = async (price, description, category, file) => {
    try {
      const formData = new FormData();
      formData.append("uploaded_file", file);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post("/products/add", formData, config);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  get = async (f) => {
    try {
      const res = await axios.get("/products");
      f(res.data);
      return res.data;
    } catch (error) {}
  };

  delete = async (id) => {
    try {
      const res = await axios.delete(`/products/${id}`);
      return res;
    } catch (err) {
      return { error: "Cannot delete" };
    }
  };

  update = async (product) => {
    try {
      const formData = new FormData();
      formData.append("uploaded_file", product.file);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.put(
        `/products/update/${product._id}`,
        formData,
        config
      );
      return res;
    } catch (err) {
      throw err;
    }
  };
}

export default new ProductService();
