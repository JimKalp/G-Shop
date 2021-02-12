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
      console.log(error);
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
      const res = await axios.put(`/products/update/${product._id}`, product);
      return res;
    } catch (err) {
      return { error: "Cannot update" };
    }
  };
}

export default new ProductService();
