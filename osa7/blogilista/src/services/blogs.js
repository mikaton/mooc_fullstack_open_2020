import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const config = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  };
  const response = await axios.post(baseUrl, newBlog, { headers: config });
  return response.data;
};

const comment = async (blog, comment) => {
  const object = { comment };
  const response = await axios.post(`${baseUrl}/${blog}/comments`, object);
  return response.data;
};

const update = async (blog, updateData) => {
  const config = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  };
  const response = await axios.patch(`${baseUrl}/${blog}`, updateData, {
    headers: config,
  });
  return response.data;
};

const remove = async blog => {
  const config = {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
  };
  const response = await axios.delete(`${baseUrl}/${blog}`, {
    headers: config,
  });
  return response.data;
};

export default { getAll, create, comment, update, remove };
