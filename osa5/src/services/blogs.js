import axios from "axios";

const baseUrl = "/api/blogs";
const user = JSON.parse(localStorage.getItem("user"));
axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newBlog => {
  const request = axios.post(baseUrl, newBlog);
  return request.then(response => response.data);
};

export default { getAll, create };
