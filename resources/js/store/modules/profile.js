import axios from 'axios'

export default {
    state: {
        id: null,
        email: '',
        name: '',
        role: '',
        verified: ''
    },
    mutations: {
        setProfile(state, payload) {
            state.id = payload.id;
            state.email = payload.email;
            state.name = payload.name;
            state.role = payload.role;
            state.verified = payload.verified;

        }

    },
    actions: {

        getMe({commit, state, rootState}) {
            return new Promise(((resolve, reject) => {

                commit('setLoading', true);
                axios.get('/profile/get-me')
                    .then(response => {
                        const data = response.data.data;
                        commit('setProfile', {
                            'id': data.id,
                            'email': data.email,
                            'name': data.name,
                            'role': data.role,
                            'verified': data.verified

                        });
                        commit('setLoading', false)
                        resolve(response);

                    })
                    .catch(error => {
                        console.log(error);
                        commit('setLoading', false);
                    })
            }))

        },
        changeEmail({commit, state, rootState}, payload) {
            commit('setLoading', true);
            axios.post('/profile/change-email', payload)
                .then(response => {
                    commit('setLoading', false);
                    resolve(response);

                })
                .catch(error => {
                    commit('setLoading', false);
                })
        },
        changePassword({commit, state, rootState}, payload) {
            commit('setLoading', true);
            axios.post('/profile/change-password', payload)
                .then(response => {
                    commit('setLoading', false);
                    resolve(response);

                })
                .catch(error => {
                    commit('setLoading', false);
                })
        },


    },
    getters: {
        getProfile: state => {
            return state;
        }
    }
}
