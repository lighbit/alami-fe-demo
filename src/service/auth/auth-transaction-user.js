import axios from "axios";
import path_file from "../../config.json";

const API_URL = path_file.base_url_log + "/api/v1/log";

class AuthTransactionUser {
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
}

export default new AuthTransactionUser();
