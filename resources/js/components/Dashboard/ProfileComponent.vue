<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>


            <material-card
                color="green"
                title="Account"
                text="Login and security">

                <v-tabs vertical>
                    <v-tab>
                        <v-icon left>mdi-account</v-icon>
                        Email
                    </v-tab>
                    <v-tab>
                        <v-icon left>mdi-lock</v-icon>
                        Password
                    </v-tab>


                    <v-tab-item>
                        <v-form ref="email">
                            <v-container py-0>
                                <v-layout wrap>


                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            :error-messages="errors.first('email')"
                                            label="Email Address"
                                            v-model="profile.email"
                                            :rules="emailRules"
                                            class="purple-input"/>
                                    </v-flex>

                                    <v-flex
                                        xs12
                                        text-xs-right
                                    >
                                        <v-btn
                                            class="mx-0 font-weight-light"
                                            color="success "
                                            @click="updateEmail"

                                        >
                                            Update Email
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-tab-item>
                    <v-tab-item>
                        <v-form ref="password">
                            <v-container py-0>
                                <v-layout wrap>


                                    <v-flex
                                        xs12
                                        md12
                                    >
                                        <v-text-field
                                            label="Current Password"
                                            type="password"
                                            :rules="requiredRules"
                                            v-model="password.current"
                                            :error-messages="errors.first('current')"

                                            class="purple-input"/>
                                        <v-text-field
                                            label="New Password"
                                            type="password"
                                            :rules="requiredRules"
                                            v-model="password.password"
                                            :error-messages="errors.first('password')"

                                            class="purple-input"/>
                                        <v-text-field
                                            label="Confirm  Password"
                                            type="password"
                                            :rules="requiredRules"
                                            v-model="password.password_confirmation"
                                            class="purple-input"/>
                                    </v-flex>

                                    <v-flex
                                        xs12
                                        text-xs-right
                                    >
                                        <v-btn
                                            class="mx-0 font-weight-light"
                                            color="success"
                                            @click="updatePassword"
                                        >
                                            Update Password
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-tab-item>
                </v-tabs>
            </material-card>
        </v-layout>

    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        /*injecting the vee-validate*/
        inject: ['$validator'],
        data() {
            return {
                requiredRules: [
                    v => !!v || 'Required field'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                usernameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 6) || 'Profilename can\'t be less than 6 characters'
                ],
                profile: JSON.parse(JSON.stringify(this.$store.getters.getProfile)),
                password: {}
            }
        },
        mounted() {
            if (this.$store.getters.userid === null) {
                this.$store.dispatch('getMe')
                    .then(response => {
                        this.profile = response.data.data;
                    })
            }
        },
        computed: {
            ...mapGetters(['getProfile'])
        },
        methods: {
            /*Update Email*/
            updateEmail() {
                if (this.$refs.email.validate()) {

                    return new Promise((resolve, reject) => {

                        this.$store.dispatch('changeEmail', {'email':this.profile.email} ).then(response => {
                            console.log(response)
                            this.$store.dispatch('showSuccessSnackbar', 'Email have been successfully Updated');
                            this.$router.go(0);

                        }).catch(error => {

                        })
                    })
                }

            },
            updatePassword() {

                if (this.$refs.password.validate()) {

                    return new Promise((resolve, reject) => {

                        this.$store.dispatch('changePassword', this.password).then(response => {
                            console.log(response)
                            this.$store.dispatch('showSuccessSnackbar', 'Password have been successfully Updated');
                            this.$router.go(0);

                        }).catch(error => {

                        })
                    })
                }

            },
        }

    }
</script>
