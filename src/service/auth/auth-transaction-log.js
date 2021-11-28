import axios from "axios";
import path_file from "../../config.json";

const API_URL = path_file.base_url + "/api/v1/transaction";

class AuthTransaction {
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

    getMoney() {
        return axios
            .get(API_URL + "/money")
            .then((res) => res.data)
            .then((repos) => {
                return repos;
            })
            .catch(function (error) {
                console.log("Show error notification!", error.data);
                return error.data;
            });
    }

    hitTransaction(agentid, date, amount, type) {
        const json = {
            agentid: agentid,
            date: date,
            amount: amount,
            type: type,
        };

        if (type === 'INCOMING') {
            console.log(json);
            return axios.post(API_URL + "/incoming", json);
        } else {
            console.log(json);
            return axios.post(API_URL + "/outgoing", json);
        }


    }
}

export default new AuthTransaction();
