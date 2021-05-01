<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        flat
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="closeDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="redirectSettings"
          >
            {{ $t('settings.save') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-row justify="center">
        <v-col lg="8">
          <v-card>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-card-title></v-card-title>
              <v-container>
                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.newPassword') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="password"
                      color="blue-grey lighten-2"
                      :error-messages="passwordErrors"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.newPasswordAgain') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="repeatPassword"
                      color="blue-grey lighten-2"
                      :error-messages="repeatPasswordErrors"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                plain
                @click="closeDialog"
              >
                {{ $t('settings.cancel') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, sameAs} from 'vuelidate/lib/validators'

    export default {
        name: "profile-settings-edit-password",
        mixins: [validationMixin],
        data() {
            return {
                password: '',
                repeatPassword: '',
                valid: true,
                dialog: true
            }
        },
        validations: {
            password:{
                required
            },
            repeatPassword:{
                required,
                sameAsPassword: sameAs('password')
            }
        },
        computed:{
            getUser() {
                return this.$store.getters['getUser']
            },

            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Password is required.');

                return errors;
            },

            repeatPasswordErrors() {
                const errors = [];
                if (!this.$v.repeatPassword.$dirty) return errors;
                !this.$v.repeatPassword.required && errors.push('Repeat password is required.');

                !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical');
                return errors;
            },
        },
        methods: {
            closeDialog() {
                this.$router.push(this.localePath({name: 'profile-settings'}));
            },

            redirectSettings() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                const personalData = {
                    id: this.getUser.id,
                    password: this.password
                };
                const body = {
                    personalData: personalData,
                    user: this.getUser,
                    store: this.$store
                };

                this.$store.dispatch('settings/updatePasswordAction', body)
                    .then(
                        () => {
                            this.$router.push(this.localePath({name: 'profile-settings'}));
                        }, error => {
                            console.log(error);
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>
