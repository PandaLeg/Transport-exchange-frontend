<template>
  <v-row
    class="fill-height"
  >
    <v-col
      cols="12"
      md="4"
      lg="4"
      class="primary"
    >
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">{{ $t('authAndReg.titleGreeting') }}</h1>
        <h5 class="text-center">{{ $t('authAndReg.subtitleDescriptionForLegal') }}</h5>
        <h5 class="text-center">{{ $t('authAndReg.subtitleClickBtnLegal') }}</h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          rounded
          outlined
          dark
          @click="decrementStep"
        >
          {{ $t('authAndReg.btnIndividual') }}
        </v-btn>
      </div>
    </v-col>

    <v-col
      cols="12"
      md="8"
      lg="8"
    >
      <v-card-text class="mt-12">
        <h1 class="text-center display-1 blue--text text--blue-3">{{ $t('authAndReg.titleCompany') }}</h1>
        <v-form
          ref="formLegal"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="companyName"
            :error-messages="companyNameErrors"
            :label="$t('authAndReg.companyName')"
            color="primary"
            prepend-inner-icon="mdi-account-group"
            clearable
            required
          />

          <v-text-field
            v-model="companyCode"
            :error-messages="companyCodeErrors"
            :label="$t('authAndReg.companyCode')"
            color="primary"
            prepend-inner-icon="mdi-account-group"
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
            :label="$t('authAndReg.selectCity')"
            prepend-inner-icon="mdi-city-variant"
            :placeholder="$t('addCargo.search')"
            required
            @change="$v.loadingPoint.$touch()"
            @blur="$v.loadingPoint.$touch()"
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
            :label="$t('authAndReg.phone')"
            color="primary"
            prepend-inner-icon="mdi-phone"
            clearable
            required
          />

          <v-text-field
            v-model="fullName"
            :error-messages="fullNameErrors"
            :label="$t('authAndReg.fullName')"
            color="primary"
            prepend-inner-icon="mdi-account-circle"
            clearable
            required
          />

          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            :label="$t('authAndReg.email')"
            color="primary"
            prepend-inner-icon="mdi-email"
            clearable
            required
          />

          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :label="$t('authAndReg.password')"
            color="primary"
            prepend-inner-icon="mdi-lock"
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
          @click="signUpLegalUser"
        >
          {{ $t('authAndReg.signUpBtn') }}
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "LegalUser",
        mixins: [validationMixin],
        props: ['setStep'],
        data() {
            return {
                step: 1,
                phone: '',
                email: '',
                password: '',
                companyName: '',
                companyCode: '',
                fullName: '',
                showPassword: false,
                loadingPoint: null,
                isLoadingPoint: false,
                searchLoadingPoint: null,
                entriesLoadingPoint: [],
                valid: true
            }
        },
        validations: {
            fullName: {
                required
            },
            loadingPoint: {
                required
            },
            phone: {
                required
            },
            companyName: {
                required
            },
            companyCode: {
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
            fullNameErrors() {
                const errors = [];
                if (!this.$v.fullName.$dirty) return errors;
                !this.$v.fullName.required && errors.push('Full name is required.');

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

            companyNameErrors() {
                const errors = [];
                if (!this.$v.companyName.$dirty) return errors;
                !this.$v.companyName.required && errors.push('Company name is required.');

                return errors;
            },

            companyCodeErrors() {
                const errors = [];
                if (!this.$v.companyCode.$dirty) return errors;
                !this.$v.companyCode.required && errors.push('Company code is required.');

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
            decrementStep() {
                this.setStep(1);
            },

            async signUpLegalUser() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                let user = {
                    companyName: this.companyName, companyCode: this.companyCode, fullName: this.fullName,
                    city: this.loadingPoint.fields.name, country: this.loadingPoint.fields.country,
                    phone: this.phone, email: this.email, password: this.password
                };

                await this.$store.dispatch('registrationUser', {user, type: 'legalUser'})
                    .then(() => {
                        this.$router.push(this.localePath('/authentication'))
                    })
                    .catch(error => {
                        console.log(error);
                    });

                console.log("OK LegalUser")
            }
        }
    }
</script>

<style scoped>

</style>
