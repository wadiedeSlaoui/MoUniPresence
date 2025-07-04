import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/user"; 

axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
  }
  return config;
});

class UserService {
  getetUsers() {
    return axios.get(User_API_BASE_URL);
  }

  deleteUser(id) {
    return axios.delete(User_API_BASE_URL+`/${id}`); 
  }

  updateUser(id, userData) {
    return axios.put(`${User_API_BASE_URL}/${id}`, userData); 
  }
}

export default new UserService();
