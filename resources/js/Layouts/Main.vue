<template>
    <v-app id="inspire" style="background: #eee;">

        <!--Side Navigation Bar -->
        <v-navigation-drawer v-model="drawer" app id="app-drawer"
                             dark
                             floating
                             persistent
                             mobile-break-point="991"
                             width="260">
            <nav-bar></nav-bar>
        </v-navigation-drawer>
        <!--End Navigation Bar-->

        <!--App Bar-->
        <v-app-bar id="core-toolbar" style="background: #eee;"
                   app
                   flat>

            <v-toolbar-title class="tertiary--text font-weight-light">

                <!--Drawer Icon-->
                <v-btn class="default v-btn--simple" @click.stop="drawer = !drawer"
                       dark
                       icon>
                    <v-icon>mdi-view-list</v-icon>
                </v-btn>

                <!--Route Title-->
                {{ title }}

            </v-toolbar-title>

            <v-spacer/>

            <!--Left Side Menu-->
            <v-toolbar-items>
                <v-flex align-center layout py-2>

                    <!--Dashboard-->
                    <router-link v-ripple class="toolbar-items" to="/">
                        <v-icon color="tertiary">mdi-view-dashboard</v-icon>
                    </router-link>
                    <!--Profile-->
                    <router-link v-ripple class="toolbar-items" to="/profile">
                        <v-icon color="tertiary">mdi-account</v-icon>
                    </router-link>
                    <!--Logout-->
                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                    </v-list-item>

                </v-flex>
            </v-toolbar-items>
            <!--End Left Side Menu-->

        </v-app-bar>

        <!--End App Head Bar-->


        <!--Main Content Views-->
        <v-content>
            <v-container>
                <transition>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </v-container>
        </v-content>
        <!--End Main Content Views-->


        <!--Shared Component-->
        <Confirm ref="confirm"></Confirm>

        <v-snackbar :timeout="3000" bottom right :color="getSnackbar.color" v-model="getSnackbar.show">
            {{ getSnackbar.text }}
            <v-btn dark text @click.native="getSnackbar.show = false" icon>
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
        <!--End Shared Component-->


    </v-app>
</template>

<script>
    import NavBar from "./Partials/navBar";

    import Confirm from "../components/Shared/Confirm";

    import {mapGetters} from 'vuex';

    export default {
        components: {NavBar, Confirm},

        data: () => ({
            drawer: null,
            title: null,
        }),
        computed: {

            ...mapGetters([
                'getSnackbar', 'getApp', 'serverUrl'

            ])
        },
        methods: {
            logout() {
                axios.post(this.serverUrl + "/logout", {})
                    .then(response => {
                        this.$router.go(0);
                    })
            }
        },
        watch: {
            '$route'(val) {
                this.title = val.name
            }
        },
        mounted() {
            this.$root.$confirm = this.$refs.confirm.open;

            return new Promise((resolve, reject) => {
                this.$store.dispatch('getMe')
                    .then(response => {
                    })
            })

        },
    }
</script>


<style lang="scss">
    @import '../styles/index.scss';
    /* Remove in 1.2 */
    .v-datatable thead th.column.sortable i {
        vertical-align: unset;
    }
    .v-application {
        font-family: sans-serif !important;
        line-height: 1.5;
    }

</style>



