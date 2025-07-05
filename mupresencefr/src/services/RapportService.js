import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/rapport";

class RapportService {

    getAll(){
        return axios.get(User_API_BASE_URL);
    }
    add(rapport){
        return axios.post(User_API_BASE_URL,rapport);
    }
    update(id,rapport){
        return axios.put(User_API_BASE_URL+"/"+id,rapport);
    }
    delete(id,rapport){
        return axios.delete(User_API_BASE_URL +"/"+id,rapport);
    }
   
}

export default new RapportService()