import axios from 'axios';

axios.interceptors.request.use( config => {
    if(sessionStorage.getItem('token')){
      config.headers.Authorization =  'Bearer ' + sessionStorage.getItem('token');
    }
    return config;
  });