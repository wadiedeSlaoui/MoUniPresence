import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/api/v1/import/module";

class ImportDataExService {

    
    
    ImportDataEx(user){
        return axios.post(User_API_BASE_URL,user);
    }
   
}

export default new ImportDataExService()