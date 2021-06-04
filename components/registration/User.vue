<template>
  <v-row>
    <v-col
      cols="12"
      md="8"
    >
      <v-card-text class="mt-12">
        <h1 class="text-center display-1 blue--text text--blue-3">{{ $t('authAndReg.titleIndividual') }}</h1>
        <h4 class="text-center mt-4"></h4>
        <v-form
          ref="formIndividual"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="lastName"
            :error-messages="lastNameErrors"
            color="primary"
            prepend-inner-icon="mdi-account-circle"
            :label="$t('authAndReg.lastName')"
            clearable
            required
          />
          <v-text-field
            v-model="firstName"
            :error-messages="firstNameErrors"
            color="primary"
            prepend-inner-icon="mdi-account-circle"
            :label="$t('authAndReg.firstName')"
            clearable
            required
          />
          <v-text-field
            v-model="patronymic"
            :error-messages="patronymicErrors"
            color="primary"
            prepend-inner-icon="mdi-account-circle"
            :label="$t('authAndReg.patronymic')"
            clearable
            required
          />

          <v-autocomplete
            v-model="loadingPoint"
            :items="entriesLoadingPoint"
            :loading="isLoadingPoint"
            :search-input.sync="searchLoadingPoint"
            :error-messages="loadingPointErrors"
            color="blue-grey lighten-2"
            hide-no-data
            hide-selected
            clearable
            item-text="fields.alternate_names"
            item-value="id"
            prepend-inner-icon="mdi-city-variant"
            :label="$t('authAndReg.selectCity')"
            :placeholder="$t('addCargo.search')"
            @change="$v.loadingPoint.$touch()"
            @blur="$v.loadingPoint.$touch()"
            required
            return-object
          >
            <template v-slot:selection="{ attr, on, item, selected }">
              <span v-text="item.fields.name"></span>
            </template>
            <template v-slot:item="{ item }">
              <v-icon left color="primary">mdi-flag</v-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.fields.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.fields.country"></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>

          <v-text-field
            v-model="phone"
            :error-messages="phoneErrors"
            color="primary"
            prepend-inner-icon="mdi-phone"
            :label="$t('authAndReg.phone')"
            clearable
            required
          />
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            color="primary"
            prepend-inner-icon="mdi-email"
            :label="$t('authAndReg.email')"
            clearable
            required
          />
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            color="primary"
            prepend-inner-icon="mdi-lock"
            :label="$t('authAndReg.password')"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            clearable
            required
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          rounded
          @click="signUpUser"
        >
          {{ $t('authAndReg.signUpBtn') }}
        </v-btn>
      </v-card-actions>
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="primary"
    >
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">{{ $t('authAndReg.titleGreeting') }}</h1>
        <h5 class="text-center">{{ $t('authAndReg.subtitleFilledFields') }}</h5>
        <h5 class="text-center">{{ $t('authAndReg.subtitleClickBtnIndividual') }}</h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          rounded
          outlined
          dark
          @click="incrementStep"
        >
          {{ $t('authAndReg.btnCompany') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "User",
        mixins: [validationMixin],
        props: ['setStep'],
        data() {
            return {
                step: 1,
                lastName: '',
                firstName: '',
                patronymic: '',
                phone: '',
                email: '',
                password: '',
                showPassword: false,
                loadingPoint: null,
                isLoadingPoint: false,
                searchLoadingPoint: null,
                entriesLoadingPoint: [],
                valid: true
            }
        },
        validations: {
            lastName: {
                required
            },
            firstName: {
                required
            },
            patronymic: {
                required
            },
            loadingPoint: {
                required
            },
            phone: {
                required
            },
            email: {
                required
            },
            password: {
                required
            }
        },
        computed: {
            lastNameErrors() {
                const errors = [];
                if (!this.$v.lastName.$dirty) return errors;
                !this.$v.lastName.required && errors.push('Last name is required.');

                return errors;
            },

            firstNameErrors() {
                const errors = [];
                if (!this.$v.firstName.$dirty) return errors;
                !this.$v.firstName.required && errors.push('First name is required.');

                return errors;
            },

            patronymicErrors() {
                const errors = [];
                if (!this.$v.patronymic.$dirty) return errors;
                !this.$v.patronymic.required && errors.push('Patronymic is required.');

                return errors;
            },

            loadingPointErrors() {
                const errors = [];
                if (!this.$v.loadingPoint.$dirty) return errors;
                !this.$v.loadingPoint.required && errors.push('City is required.');

                return errors;
            },

            phoneErrors() {
                const errors = [];
                if (!this.$v.phone.$dirty) return errors;
                !this.$v.phone.required && errors.push('Phone is required.');

                return errors;
            },

            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('Email is required.');

                return errors;
            },

            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required && errors.push('Password is required.');

                return errors;
            }

        },
        watch: {
            searchLoadingPoint(val) {
                let checkFilled = false;

                if (this.entriesLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesLoadingPoint.length; i++) {
                        if (this.loadingPoint === this.entriesLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingPoint) return;

                    this.isLoadingPoint = true;

                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-500&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => {
                            this.isLoadingPoint = false;
                        });
                }
            }
        },
        methods: {
            incrementStep() {
                this.setStep(2);
            },

            async signUpUser() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                let user = {
                    firstName: this.firstName, lastName: this.lastName, patronymic: this.patronymic,
                    city: this.loadingPoint.fields.name, country: this.loadingPoint.fields.country,
                    phone: this.phone, email: this.email, password: this.password
                };

                await this.$store.dispatch('registrationUser', {user, type: 'user'})
                    .then(() => {
                        this.$router.push(this.localePath('/authentication'))
                    })
                    .catch(error => {
                        console.log(error);
                    });

                console.log("OK USER")
            }
        }
    }
</script>

<style scoped>

</style>
