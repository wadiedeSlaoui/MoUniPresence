import axios from 'axios';
import StudentList from 'studentlist/Studentlist';

const User_API_BASE_URL = "http://localhost:8080/api/v1/presence";

class PresenceService {

    presenceList(){
        return axios.get(User_API_BASE_URL);
    }
    updateSurv(presence){
        return axios.post(User_API_BASE_URL,presence);
    }
   
    listOfFiliere(){
        return axios.get(User_API_BASE_URL +"/filiere/"+sessionStorage.getItem("user"));
    }
    listOfModuleByFilier(filiere){
        const username = sessionStorage.getItem("user");

    return axios.get(User_API_BASE_URL + "/module", {
        params: {
            filiere: filiere,
            username: username
        }
    });
    }
    listOfRoomByFilierAndModule(module, filiere) {
    const username = sessionStorage.getItem("user");

    return axios.get(User_API_BASE_URL + "/room", {
        params: {
            module: module,
            filiere: filiere,
            username: username
        }
    });
}
listOfStudentByFilierAndModuleAndRoom(module, filiere,room) {
    const username = sessionStorage.getItem("user");

    return axios.get(User_API_BASE_URL + "/students", {
        params: {
            module: module,
            filiere: filiere,
            username: username,
            room: room
        }
    });
}
listOfStudentByFilierAndModuleAndRoomSubmitted(module, filiere,room,username) {

    return axios.get(User_API_BASE_URL + "/studentsSubmited", {
        params: {
            module: module,
            filiere: filiere,
            username: username,
            room: room
        }
    });
}
submitStudentPresenceListByFilierAndModuleAndRoom(module, filiere,room,studentList) {
    const username = sessionStorage.getItem("user");

    return axios.post(User_API_BASE_URL + "/studentsPresence", 
        studentList,
        {
        params: {
            module: module,
            filiere: filiere,
            username: username,
            room: room
        }
    });
}
}

export default new PresenceService()