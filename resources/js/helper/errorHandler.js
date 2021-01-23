import axios from 'axios'
import {store} from '../store'
import {app} from "../app";

function errorResponseHandler(error) {

    app.$validator.errors.clear()

    // check for errorHandle config
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
        return Promise.reject(error);
    }

    if (error.response.status === 403 || error.response.status === 401 ) {
        store.dispatch('showErrorSnackbar', 'Unauthorized Access');

        // axios.post(app.baseURL+"/logout")
        //     .then(response => {
        //         router.go(0);
        //     }).catch(err => {
        //         console.log("Error Logout");
        // });
        return Promise.reject(error);


    }

    if (error.response.status === 404) {
        store.dispatch('showErrorSnackbar', 'Unknown Route');

        // router.push({name:'NotFound'}).catch(err => {
        //     console.log("Error NotFound");
        // });
        return Promise.reject(error);

    }


    if (error.response.status === 422 || error.response.status === 400) {
        //Clearing Previous Errors
        app.$validator.errors.clear()
        for (let key in error.response.data) {
            app.$validator.errors.add({field: key, msg: error.response.data[key][0]})
        }
        return Promise.reject(error);

    }


    store.dispatch('showErrorSnackbar', 'Unknown Error Occured');
    return Promise.reject(error);

}

// apply interceptor on response
axios.interceptors.response.use((response) => {
        if(response.status === 201) {
            app.$validator.errors.clear()
        }
        return response;
    },
    errorResponseHandler
);

export default errorResponseHandler;
