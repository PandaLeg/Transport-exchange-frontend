<template>
  <v-card
    dark
    v-if="n === 2"
  >
    <v-row
      class="pa-4"
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <h3 class="headline">
          {{ $t('addTransport.transportAndPaymentTitle') }}
        </h3>
      </v-col>
    </v-row>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-container>

        <v-row>
          <v-col>
            <v-subheader inset class="text--white">
              {{ $t('addTransport.transport') }}
            </v-subheader>
            <v-divider inset></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.typeBody') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-autocomplete
              v-model="bodyType"
              :items="bodyTypes"
              :loading="isLoading"
              :search-input.sync="searchBodyType"
              :error-messages="bodyTypeErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="id"
              :label="$t('addTransport.selectBodyType')"
              :placeholder="$t('addTransport.search')"
              filled
              @change="$v.bodyType.$touch()"
              @blur="$v.bodyType.$touch()"
              return-object
            >
              <template v-slot:selection="{ attr, on, item, selected }">
                <span v-text="item.name"></span>
              </template>
              <template v-slot:item="{ item }">
                <fa-icon :icon="faTruckMoving"></fa-icon>
                <v-list-item-content class="ml-lg-5">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.carryingCapacity') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="carryingCapacityFrom"
              type="number"
              :error-messages="carryingCapacityFromErrors"
              color="blue-grey lighten-2"
              :label="$t('addTransport.from')"
              filled
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="carryingCapacityUpTo"
              type="number"
              :error-messages="carryingCapacityUpToErrors"
              color="blue-grey lighten-2"
              :label="$t('addTransport.before')"
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
              {{ $t('addTransport.volume') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeFrom"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.from')"
              filled
              clearable
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeUpTo"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.before')"
              filled
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col
            cols="12"
            md="1"
            lg="1"
          >
            <v-subheader>
              {{ $t('addTransport.dimensions') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
            class="ml-lg-8"
          >
            <v-text-field
              v-model="lengthTransport"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.length')"
              filled
              clearable
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="widthTransport"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.width')"
              filled
              clearable
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="heightTransport"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.height')"
              filled
              clearable
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              ADR
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            lg="10"
            md="10"
          >
            <v-select
              v-model="adr"
              :items="getListArg"
              :menu-props="{ bottom: true, offsetY: true }"
              :hint="$t('addTransport.selectAdr')"
              persistent-hint
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.loading') }}
            </v-subheader>
          </v-col>
          <v-col
            md="10"
            lg="10"
          >
            <v-combobox
              v-model="typesLoadingTruck"
              :items="getListLoadingCar"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectLoadingType')"
              filled
              clearable
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.unloading') }}
            </v-subheader>
          </v-col>
          <v-col
            md="10"
            lg="10"
          >
            <v-combobox
              v-model="typesUnloadingTruck"
              :items="getListLoadingCar"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectUnloadingType')"
              filled
              clearable
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.permissions') }}
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-combobox
              v-model="permissions"
              :items="getListPermissions"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectPermissionType')"
              filled
              clearable
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-subheader inset>
              {{ $t('addTransport.payment') }}
            </v-subheader>
            <v-divider inset></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.paymentType') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="typePayment"
              :items="getTypesPayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectPaymentType')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col
            cols="12"
            md="1"
            lg="1"
          >
            <v-subheader>
              {{ $t('addTransport.cost') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
            class="ml-lg-7"
          >
            <v-text-field
              v-model="cost"
              type="number"
              color="blue-grey lighten-2"
              :label="$t('addTransport.sum')"
              filled
              clearable
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки' ||
              typePayment === 'Bid request' || typePayment === 'Запит ставки'"
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
          >
            <v-select
              v-model="currency"
              :items="getListCurrency"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.currency')"
              filled
              clearable
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки' ||
              typePayment === 'Bid request' || typePayment === 'Запит ставки'"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
          >
            <v-select
              v-model="costPer"
              :items="getListCostPer"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.for')"
              filled
              clearable
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки' ||
              typePayment === 'Bid request' || typePayment === 'Запит ставки'"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.paymentForm') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="paymentForm"
              :items="getListFormPayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectPaymentForm')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.paymentTime') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="paymentTime"
              :items="getListTimePayment"
              :menu-props="{ bottom: true, offsetY: true }"
              :label="$t('addTransport.selectPaymentTime')"
              filled
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addTransport.prepayment') }}
            </v-subheader>
          </v-col>

          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-text-field
              v-model="prepayment"
              type="number"
              color="blue-grey lighten-2"
              label="10%"
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
        :disabled="!valid"
        color="blue-grey darken-3"
        depressed
        @click="nextStep(n)"
      >
        <fa-icon :icon="faArrowAltCircleRight"></fa-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {typesBody} from '../../json/body.type.json'
    import {faTruckMoving} from '@fortawesome/free-solid-svg-icons'
    import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        name: "StepDescTransport",
        mixins: [validationMixin],
        props: ['n', 'e1', 'setE1', 'steps'],
        data() {
            return {
                bodyType: null,
                carryingCapacityFrom: null,
                carryingCapacityUpTo: null,
                volumeFrom: null,
                volumeUpTo: null,
                lengthTransport: null,
                widthTransport: null,
                heightTransport: null,
                adr: null,
                searchBodyType: null,
                typesLoadingTruck: [],
                typesUnloadingTruck: [],
                permissions: [],
                typePayment: '',
                cost: null,
                currency: '',
                costPer: '',
                paymentForm: '',
                paymentTime: '',
                prepayment: null,
                isLoading: false,
                valid: true
            }
        },
        validations: {
            bodyType: {
                required
            },

            carryingCapacityFrom: {
                required
            },

            carryingCapacityUpTo: {
                required
            }
        },
        computed: {
            faArrowAltCircleRight() {
                return faArrowAltCircleRight
            },

            faTruckMoving() {
                return faTruckMoving
            },

            bodyTypes(){
                if (this.$i18n.localeProperties.code === 'en') {
                    return typesBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.enName})
                    });
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return typesBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.uaName})
                    });
                } else {
                    return typesBody.map(item => {
                        return Object.assign({}, {id: item.id, name: item.ruName})
                    });
                }
            },

            getInitialTransport() {
                return this.$store.getters['transport/getInitialTransport']
            },

            getListArg() {
                return this.$store.getters['transport/getListArg'];
            },

            getListLoadingCar() {
                let loadingCar = this.$store.getters['transport/getLoadingCar'];
                return this.checkLocaleAndGetList(loadingCar);
            },

            getListPermissions() {
                let permission = this.$store.getters['transport/getPermission'];
                return this.checkLocaleAndGetList(permission);
            },

            getTypesPayment() {
                let paymentType = this.$store.getters['transport/getPaymentType'];
                return this.checkLocaleAndGetList(paymentType);
            },

            getListCurrency() {
                return this.$store.getters['transport/getListCurrency']
            },

            getListCostPer() {
                let costPer = this.$store.getters['transport/getCostPer'];
                return this.checkLocaleAndGetList(costPer);
            },

            getListFormPayment() {
                let paymentForm = this.$store.getters['transport/getPaymentForm'];
                return this.checkLocaleAndGetList(paymentForm);
            },

            getListTimePayment() {
                let paymentTime = this.$store.getters['transport/getPaymentTime'];
                return this.checkLocaleAndGetList(paymentTime);
            },

            bodyTypeErrors() {
                const errors = [];

                if (!this.$v.bodyType.$dirty) return errors;
                !this.$v.bodyType.required && errors.push('Body type is required.');

                return errors;
            },

            carryingCapacityFromErrors() {
                const errors = [];

                if (!this.$v.carryingCapacityFrom.$dirty) return errors;
                !this.$v.carryingCapacityFrom.required && errors.push('Carrying capacity from is required.');

                return errors;
            },

            carryingCapacityUpToErrors() {
                const errors = [];

                if (!this.$v.carryingCapacityUpTo.$dirty) return errors;
                !this.$v.carryingCapacityUpTo.required && errors.push('Carrying capacity up to is required.');

                return errors;
            }
        },
        methods: {
            nextStep(n) {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                let transport = {
                    carryingCapacityFrom: this.carryingCapacityFrom, carryingCapacityUpTo: this.carryingCapacityUpTo,
                    volumeFrom: this.volumeFrom, volumeUpTo: this.volumeUpTo, lengthTransport: this.lengthTransport,
                    widthTransport: this.widthTransport, heightTransport: this.heightTransport, adr: this.adr,
                    cost: this.cost, currency: this.currency, prepayment: this.prepayment
                };

                let propertiesTransport = {
                    bodyType: this.bodyType.name, typesLoadingTruck: this.typesLoadingTruck,
                    typesUnloadingTruck: this.typesUnloadingTruck, permissions: this.permissions,
                    typePayment: this.typePayment, costPer: this.costPer, paymentForm: this.paymentForm,
                    paymentTime: this.paymentTime
                };

                this.$store.commit('transport/setInitialTransport', Object.assign(this.getInitialTransport, transport));

                let tempPropertiesTransport = Object.assign({}, propertiesTransport);

                this.$store.commit('transport/setPropertiesTransport', tempPropertiesTransport);

                if (n === this.steps) {
                    this.setE1(1);
                } else {
                    this.setE1(n + 1);
                }
            },

            checkLocaleAndGetList(someObject){
                if (this.$i18n.localeProperties.code === 'en') {
                    return someObject.listEn
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return someObject.listUa
                } else {
                    return someObject.listRu
                }
            }
        }
    }
</script>

<style scoped>

</style>
