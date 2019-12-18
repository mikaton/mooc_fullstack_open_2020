import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (user, newBlog) => {
  const config = { Authorization: `Bearer ${user.token}` };
  const request = axios.post(baseUrl, newBlog, { headers: config });
  return request.then(response => response.data);
};

export default { getAll, create };
