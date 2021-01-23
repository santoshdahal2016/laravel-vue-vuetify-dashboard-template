import axios from 'axios';

export default {
    state: {
        users: [],
        user: {},
    },
    mutations:{
        setUser(state,payload){
            state.user = payload
        },
        setUsers(state,payload){
            state.users = payload;
        },
        setUserId(state,payload){
            state.user.id = payload
        },

    },
    actions: {
        fetchUser({commit,state,rootState},payload){
            return new Promise(((resolve, reject) => {
                commit('setLoading',true);
                axios.get('/users/'+payload)
                    .then(response =>{
                        commit('setLoading',false)
                        commit('setUser',response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('setLoading',false);
                        reject(error)
                    })

            }))

        },
        fetchUsers({commit,state,rootState},payload){
            return new Promise(((resolve, reject) => {
                commit('setLoading',true);
                axios.get('/users',{params:payload})
                    .then(response =>{
                        commit('setLoading',false)
                        commit('setUsers',response.data.data)
                        resolve(response)

                    })
                    .catch(error => {
                        commit('setLoading',false);
                        reject(error)
                    })

            }))

        },
        saveUser({commit,state,rootState},payload){
            return new Promise(((resolve, reject) => {

                commit('setLoading',true);
                const app = this;
                if(payload.id){
                    axios.put('/users/'+payload.id,payload)
                        .then(response => {
                            commit('setLoading',false);

                            resolve(response);
                        })
                        .catch(error => {
                            commit('setLoading',false);
                            reject(error);
                        });
                }
                else{
                    axios.post('/user',payload)
                        .then(response => {
                            commit('setLoading',false);
                            resolve(response);
                        })
                        .catch(error => {
                            commit('setLoading',false);
                            reject(error);
                        });
                }

            }))


        },

        deleteUser({commit,state,rootState},payload){
            return new Promise(((resolve, reject) => {
                commit('setLoading',true);
                axios.delete('/users/'+payload)
                    .then(response =>{
                        commit('setLoading',false)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('setLoading',false);
                        reject(error)
                    })

            }))

        },
        setUser({commit,state},payload){
            commit('setUser',payload);
        },
        clearUser({commit}){
            commit('setUser',{})
        },

    },
    getters: {
        getUser:state => {
            return state.user;
        },
        getUsers:state => {
            return state.users;
        }
    }
}
