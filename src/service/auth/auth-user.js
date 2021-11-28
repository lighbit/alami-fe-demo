import axios from "axios";
import path_file from "../../config.json";

const API_URL = path_file.base_url + "/api/v1/user";

class AuthUser {
    findAll() {
        return axios
            .get(API_URL + "/all")
            .then((res) => res.data)
            .then((repos) => {
                return repos;
            })
            .catch(function (error) {
                console.log("Show error notification!", error.data);
                return error.data;
            });
    }

    registeruser(id, name, born, address) {
        const json = {
            id: id,
            name: name,
            born: born,
            address: address,
        };
        console.log(json);
        return axios.post(API_URL + "/register", json);
    }

    getEditUser(idUser) {
        return axios
            .get(API_URL + "/" + idUser)
            .then((res) => res.data)
            .then((repos) => {
                return repos;
            })
            .catch(function (error) {
                console.log("Show error notification!", error.data);
                return error.data;
            });
    }

    delete(idUser) {
        return axios.delete(API_URL + "/" + `${idUser}`);
    }
}

export default new AuthUser();
