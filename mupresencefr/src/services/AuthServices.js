import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/auth";

class AuthService {

    login(username,password){
        return axios.post(User_API_BASE_URL+"/login",{username,password});
    }
    user(username){
        return axios.get(User_API_BASE_URL+"/user/"+username);
    }
   
}

export default new AuthService()