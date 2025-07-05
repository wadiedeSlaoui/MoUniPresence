import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/presence";

class PresenceService {

    presenceList(){
        return axios.get(User_API_BASE_URL);
    }
    updateSurv(presence){
        return axios.post(User_API_BASE_URL,presence);
    }
   
}

export default new PresenceService()