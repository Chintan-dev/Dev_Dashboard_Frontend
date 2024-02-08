import axios from "axios";

export default async function fetching(endpoint){
    return axios.get(`${process.env.REACT_APP_API_ENDPOINT_DEV}${endpoint}`)
        .then(response => {
            if (response.data.success) {
                return response.data; // Returning the data instead of the whole response
            } else {
                throw new Error('API request was not successful');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
            return Promise.reject(error); // Propagate the error
        });
}