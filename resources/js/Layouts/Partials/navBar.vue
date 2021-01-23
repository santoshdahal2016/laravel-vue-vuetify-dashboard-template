<template>
    <v-img :src="sidebar" height="100%">
        <v-layout tag="v-list" column>
            <v-list-item avatar>

                <v-list-item-avatar color="white">
                    <v-img :src="logo" height="34" contain/>
                </v-list-item-avatar>

                <v-list-item-title class="title">
                    {{getApp.title}}
                </v-list-item-title>
            </v-list-item>

            <v-divider/>

            <v-list-item v-for="item in routes" v-show="item.hidden === false && item.meta.role.includes(userrole)" :key="item.path"
                         @click="$router.push(item.path).catch(err => {})" avatar
                         class="v-list-item">

                <v-list-item-action>
                    <v-icon>{{item.meta.icon}}</v-icon>
                </v-list-item-action>

                <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item>
        </v-layout>
    </v-img>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from 'axios';

    export default {
        components: {},
        data() {
            return {
                logo: '/images/logo.png',
                sidebar: '/images/sidebar.png'
            }
        },
        methods: {
            logout() {
                axios.post(this.serverUrl + "/logout", {})
                    .then(response => {
                        this.$router.go(0);
                    })
            }
        },
        computed: {
            ...mapGetters([
                'serverUrl', 'getApp','userrole'
            ]),
            routes() {
                return this.$router.options.routes
            }
        }
    }
</script>
<style lang="scss">
    #app-drawer {
        .v-list {
            border-radius: 4px;
        }
    }
</style>
