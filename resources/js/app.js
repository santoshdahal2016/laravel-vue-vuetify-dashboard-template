/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
import Router from './router/index.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate';
import axios from 'axios';
import {store} from "./store";
import errorHandler from './helper/errorHandler';
import './components'
window.Vue = require('vue');

Vue.use(VeeValidate, { inject: false })
Vue.use(Vuetify);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */



Vue.component('main-app', require('./Layouts/Main').default);


/**
 * Axios Settings
 */
axios.defaults.baseURL = store.state.serverUrl+"/api"
Vue.use(axios)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

export  const app = new Vue({
    el: '#app',
    store,
    vuetify: new Vuetify(),
    router: Router,
});
