<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <material-card
                    color="green"
                    :title="'Welcome,  '+getProfile.name"
                >
                    <div class="card-body">
                        This is Dashboard . You can Edit this at
                        resources>js>components>Dashboard>DashboardComponent.vue
                    </div>
                </material-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {

        computed: {
            ...mapGetters([
                'getProfile'
            ])
        },
        mounted() {

        },
    }
</script>
