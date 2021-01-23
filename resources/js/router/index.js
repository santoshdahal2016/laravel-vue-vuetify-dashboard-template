import Vue from 'vue'
import Router from 'vue-router'

//Dashboard Page Component
import Home from '../components/Dashboard/DashboardComponent.vue'
import UserComponent from "../components/Dashboard/UserComponent";
import ProfileComponent from "../components/Dashboard/ProfileComponent";


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: Home,
            meta: {
                role: ['admin','user'],
                icon: 'mdi-view-dashboard',
            }
            , hidden: false
        },

        {
            path: "/users",
            name: "Users",
            component: UserComponent,
            meta: {
                role: ['admin'],
                icon:'mdi-account',
            }
            , hidden: false
        },
        {
            path: "/profile",
            name: "Profile",
            component: ProfileComponent,
            meta: {
                role: ['admin','user'],
                icon:'mdi-account',
            }
            , hidden: true
        }

    ]
})

export default router
