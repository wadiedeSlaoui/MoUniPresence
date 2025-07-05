import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/filiereAndModule";

class FiliereAndModuleService {

    getAllFiliers(){
        return axios.get(User_API_BASE_URL);
    }
    getAllModules(filiere){
        return axios.get(User_API_BASE_URL+"/"+filiere);
    } 
}

export default new FiliereAndModuleService()