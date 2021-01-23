<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="container">

        <!--Table View Started-->
        <material-card
            color="green"
            title="Users"
        >
            <v-data-table
                :items="data"
                :headers="headers"
                :loading="loading" loading-text="Loading... Please wait"
                :options.sync="options"
                :server-items-length="totalData">

                <template v-slot:top>
                    <v-text-field @change="fetch" v-model="options.search" prepend-icon="search" label="Search ......"
                                  class="mx-4">
                    </v-text-field>
                </template>

                <template v-slot:item.role="{ item }">
                    <v-chip :color="item.role=='admin'?'teal':'blue'" dark>
                        {{item.role.charAt(0).toUpperCase()+item.role.slice(1) }}
                    </v-chip>
                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)" color="teal darken-2">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteItem(item)" color="red darken-2">
                        delete
                    </v-icon>
                </template>

                <template slot="no-data">
                    <v-alert :value="true" color="error" icon="warning">
                        Sorry, No Users Yet.
                    </v-alert>
                </template>

            </v-data-table>
        </material-card>
        <!--Edit Dialog-->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit User</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">

                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field :rules="usernameRules" v-model="editedItem.name"
                                                  :error-messages="errors.first('name')"
                                                  v-on:keyup.enter="$event.target.nextElementSibling.focus()"
                                                  label="User Name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field :rules="emailRules" v-model="editedItem.email"
                                                  :error-messages="errors.first('email')"
                                                  label="Email"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-select
                                        v-model="editedItem.role"
                                        :items="[{'text':'Admin','value':'admin'},{'text':'User','value':'user'}]"
                                        :rules="requiredRules"
                                        label="Select Role"
                                        :error-messages="errors.first('role')"
                                        required
                                    ></v-select>
                                </v-col>
                            </v-form>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        /*injecting the vee-validate*/
        inject: ['$validator'],

        data() {
            return {

                /*Data Table Related Variable*/
                loading: true,
                headers: [
                    {text: 'Name', align: 'left', sortable: false, value: 'name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Role', value: 'role'},
                    {text: 'Actions', value: 'action', sortable: false},
                ],
                data: [],
                totalData: 0,

                /*Search and Query Related Variable*/
                options: {
                    page: 1,
                    itemsPerPage: 10,
                    search: undefined,
                    sort: 'desc'
                },

                /*Edit Dialog Related Variables*/
                dialog: false,
                valid: true,
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
                editedIndex: -1,
                editedItem: {
                    name: '',
                    email: '',
                    role: '',
                },
                defaultItem: {
                    name: '',
                    email: '',
                    role: '',
                },
                path: JSON.parse(JSON.stringify(this.$route.path))
            }
        }, computed: {
            ...mapGetters([]),
            getFullPath () {
                return this.$route.path
            }
        },
        watch: {
            options: {
                handler() {
                    this.fetch();
                },
                deep: true,
            },
            dialog(val) {
                val || this.close()
            },
            getFullPath () {
                if(this.getFullPath === this.path){
                    this.fetch()
                }
            }

        },

        methods: {
            /*Fetch Users*/
            fetch() {
                return new Promise((resolve, reject) => {
                    this.$store.dispatch('fetchUsers', this.options)
                        .then(response => {
                            this.data = response.data.data;
                            this.loading = false;
                            this.totalData = response.data.meta.total;
                        }).catch(error => {
                        // console.log(error.response.status);
                    });
                })

            },

            /*Show Edit Dialog*/
            editItem(item) {
                this.editedIndex = this.data.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true

            },

            /*Save the Edited User*/
            save() {
                if (this.$refs.form.validate()) {
                    return new Promise((resolve, reject) => {
                        this.$store.dispatch('saveUser', this.editedItem).then(response => {
                            if (response.status === 201) {
                                this.$store.dispatch('showSuccessSnackbar', 'User was created successfully');
                            } else {
                                this.$store.dispatch('showSuccessSnackbar', 'User was edited successfully');
                            }
                            this.close()
                            this.fetch();

                        }).catch(error => {
                            // this.$store.dispatch('showErrorSnackbar', error.response.data);

                        })
                    })
                }

            },

            /*Closes the Edit Dialog*/
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            /*Delete User*/
            deleteItem(item) {
                const index = this.data.indexOf(item)
                this.$root.$confirm('Delete ' + item.name, 'Are you sure?', {color: 'red'})
                    .then((confirm) => {
                        if (confirm) {
                            //if true, call delete end point
                            this.$store.dispatch('deleteUser', item.id)
                                .then(response => {
                                    this.$store.dispatch('showSuccessSnackbar', response.data.message);
                                    this.fetch();
                                })
                        } else {

                        }
                    })
            },


        },
    }
</script>
