<template>
  <v-container id="login">
    <v-row
      justify="center"
    >
      <v-card class="mt-8" width="500">
        <v-card-title>Please Sign IN</v-card-title>
        <form name="form">
          <v-card-text class="pr-5 pl-5">
            <v-text-field
              outlined
              label="Email"
              append-icon="mdi-account-circle"
              v-model="email"
              name="email"
              clearable
              required
            ></v-text-field>
            <v-text-field
              outlined
              label="Password"
              v-model="password"
              name="password"
              append-icon="mdi-shield"
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
              color="teal"
              class="white--text"
              form="check-login-form"
              rounded
              block
              large
              @click="handleLogin"
            >Log IN
            </v-btn>
          </v-card-actions>
        </form>
        <v-row justify="center" class="pt-3">
          <NuxtLink to="/">
            Home page
          </NuxtLink>
        </v-row>
        <v-list>
          <v-subheader>Registration Page</v-subheader>
          <v-list-item-group color="teal">
            <v-list-item class="teal--text" @click="">
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-circle'" color="teal"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="teal--text">
                <v-list-item-title v-text="'Registration'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        // Если мы используем store, то в nuxt присутствует другой метод для server side rendering, под названием fetch
        // который аналогичен asyncData()
        async fetch({store}) {

        },
        data() {
            return {
                showPassword: false,
                email: '',
                password: '',
                loading: false
            }
        },
        layout: 'auth',
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
                                    this.$router.push('/');
                                }, error => {
                                    console.log(error);
                                    this.loading = false;
                                }
                            );
                    }
                }
            },
        }
    }
</script>

<style scoped>
  span {
    display: block;
  }

  .v-progress-linear {
    display: block;
    margin: 0 auto;
  }
</style>
