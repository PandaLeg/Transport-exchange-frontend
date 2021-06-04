<template>
  <div>
    <v-container fluid fill-height>
      <v-row
        justify="center"
        align="center"
      >
        <v-col>
          <v-card class="mt-8 mx-auto elevation-12" width="400">
            <v-toolbar dark color="primary">
              <v-toolbar-title> {{ $t('authAndReg.titleSignIn') }} </v-toolbar-title>
            </v-toolbar>
            <form name="form">
              <v-card-text class="pr-5 pl-5">
                <v-text-field
                  v-model="email"
                  outlined
                  prepend-inner-icon="mdi-account-circle"
                  :label="$t('authAndReg.email')"
                  name="email"
                  clearable
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  outlined
                  prepend-inner-icon="mdi-shield"
                  :label="$t('authAndReg.password')"
                  name="password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  clearable
                  required
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="pr-5 pl-5">
                <v-progress-circular
                  v-if="loading"
                  class="v-progress-linear"
                  size="24"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-btn
                  v-else
                  color="primary"
                  class="white--text"
                  form="check-login-form"
                  rounded
                  block
                  large
                  @click="handleLogin"
                >
                  {{ $t('authAndReg.btnLogin') }}
                </v-btn>
              </v-card-actions>
            </form>
            <!--            <v-row justify="center" class="pt-3">
                          <NuxtLink to="/">
                            Home page
                          </NuxtLink>
                        </v-row>-->
            <v-card-text>
              <v-list>
                <v-subheader>{{ $t('authAndReg.titleRegisterPage') }}</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item @click="redirectToRegistration">
                    <v-list-item-icon>
                      <v-icon v-text="'mdi-account-circle'" color="primary"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t('authAndReg.itemRegisterPage')"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    import mainPhoto from '../assets/main_photo.jpg'

    export default {
        // Если мы используем store, то в nuxt присутствует другой метод для server side rendering, под названием fetch
        // который аналогичен asyncData()
        data() {
            return {
                showPassword: false,
                email: '',
                password: '',
                loading: false
            }
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            getBackgroundImage() {
                return mainPhoto;
            }
        },
        methods: {
            async handleLogin() {
                this.loading = true;
                let checkLog = false;

                if (this.email && this.password) {
                    await this.$store.dispatch('login', {
                        email: this.email,
                        password: this.password
                    })
                        .then(
                            () => {
                                checkLog = true;
                            }, error => {
                                console.log(error);
                                this.loading = false;
                            }
                        );

                    if (checkLog) {
                        const token = this.$cookies.get('token');
                        await this.$store.dispatch('getUserAction', token)
                            .then(
                                () => {
                                    let find = this.getUser.roles.find(i => i.name === 'ROLE_ADMIN');

                                    if (find) {
                                        this.$router.push(this.localePath('/admin-panel'));
                                    } else {
                                        this.$router.push(this.localePath('/'));
                                    }
                                }, error => {
                                    console.log(error);
                                    this.loading = false;
                                }
                            );
                    }
                }
            },

            redirectToRegistration() {
                this.$router.push(this.localePath('/registration'))
            }
        }
    }
</script>

<style scoped>
  span {
    display: block;
  }

  .background-image {
    border-radius: 4px;
    background: center no-repeat;
    background-size: cover;
  }

  .background-image:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 2;
  }

  .card-auth {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    color: #fff;
  }

  .v-progress-linear {
    display: block;
    margin: 0 auto;
  }

</style>
