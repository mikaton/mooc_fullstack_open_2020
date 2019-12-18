import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const config = {
    Authorization: token,
  };
  const response = await axios.post(baseUrl, newBlog, { headers: config });
  return response.data;
};

const update = async (blog, updateData) => {
  const config = {
    Authorization: token,
  };
  const response = await axios.patch(`${baseUrl}/${blog}`, updateData, {
    headers: config,
  });
  return response.data;
};

export default { setToken, getAll, create, update };
