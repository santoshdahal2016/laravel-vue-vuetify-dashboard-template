const getters = {

    loading: state => state.loading,
    serverUrl: state => state.serverUrl,
    userid: state => state.profile.id,
    userrole: state => state.profile.role,

}
export default getters
