<template>
    <div class="app flex-row align-items-center">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="8">
                    <b-card-group>
                        <b-card no-body class="p-4">
                            <b-card-body>
                                <b-form>
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-user"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input
                                                type="text"
                                                class="form-control"
                                                placeholder="Username"
                                                v-model="admin.name"
                                                autocomplete="username email" />
                                    </b-input-group>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend>
                                            <b-input-group-text>
                                                <i class="icon-lock"></i>
                                            </b-input-group-text>
                                        </b-input-group-prepend>
                                        <b-form-input type="password"
                                                      class="form-control"
                                                      placeholder="Password"
                                                      v-model="admin.password"
                                                      autocomplete="current-password" />
                                    </b-input-group>
                                    <b-row>
                                        <b-col cols="6">
                                            <b-button variant="primary"
                                                      @click="login"
                                                      :disabled="busy || !disabled"
                                                      class="px-4">Login</b-button>
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                            <b-button variant="link" class="px-0">Forgot password?</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card-body>
                        </b-card>
                        <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                            <b-card-body class="text-center">
                                <div>
                                    <h2>Sign up</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                                </div>
                            </b-card-body>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { action, getter } from '../../store/types'
    import Admin from '../../models/Admin'
    import OAuthResult from '../../models/Entities/OAuthResult'

    export default {
        name: 'Login',
        middleware: 'guest',

        data () {
            return {
                admin: new Admin(),
                error: null,
                busy: false
            }
        },

        computed: {
            ...mapGetters({
            }),

            disabled () {
                return this.admin.name.length && this.admin.password.length
            },

        },

        async created () {
        },

        methods: {
            ...mapActions([
                action.ADMIN_SAVE_TOKEN,
                action.FETCH_ADMIN_USER
            ]),

            async login () {
                this.error = false
                try {

                    this.busy = true
                    const {data} = await this.admin.post('/admin/login')
                    const result = new OAuthResult(data)

                    if (!result.token) {
                        this.error = true
                        return
                    }

                    this[action.ADMIN_SAVE_TOKEN](result)

                    await this[action.FETCH_ADMIN_USER]()

                    this.$router.go('/')

                } catch(e) {
                    this.error = true
                    throw new Error(e)

                } finally {
                    this.busy = false
                }
            }
        },
    }
</script>
