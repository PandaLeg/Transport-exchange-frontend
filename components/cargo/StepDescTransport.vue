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
          {{ $t('addCargo.transportAndPayment') }}
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
              {{ $t('addCargo.transport') }}
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
              {{ $t('addCargo.typeBody') }}
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
              item-text="name"
              item-value="id"
              :label="$t('addCargo.selectBodyType')"
              :placeholder="$t('addCargo.search')"
              clearable
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
            cols="12"
            md="2"
            lg="2"
          >
            <v-subheader>
              {{ $t('addCargo.loading') }}
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
              :label="$t('addCargo.selectLoadingType')"
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
              {{ $t('addCargo.unloading') }}
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
              :label="$t('addCargo.selectUnloadingType')"
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
              {{ $t('addCargo.permissions') }}
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
              :label="$t('addCargo.selectPermissionType')"
              filled
              clearable
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-subheader inset>
              {{ $t('addCargo.payment') }}
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
              {{ $t('addCargo.typePayment') }}
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
              :label="$t('addCargo.selectPaymentType')"
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
              {{ $t('addCargo.cost') }}
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
              :label="$t('addCargo.sum')"
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки' ||
              typePayment === 'Bid request' || typePayment === 'Запит ставки'"
              filled
              clearable
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
              :label="$t('addCargo.currency')"
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
              :label="$t('addCargo.for')"
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
              {{ $t('addCargo.paymentForm') }}
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
              :label="$t('addCargo.selectPaymentForm')"
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
              {{ $t('addCargo.paymentTime') }}
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
              :label="$t('addCargo.selectPaymentTime')"
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
              {{ $t('addCargo.prepayment') }}
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
              label="50%"
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
    import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
    import {faTruckMoving} from '@fortawesome/free-solid-svg-icons'
    import {typesBody} from '../../json/body.type.json'
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        props: ['n', 'e1', 'setE1', 'steps'],
        data() {
            return {
                bodyType: null,
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

            getInitialCargo() {
                return this.$store.getters['cargo/getInitialCargo']
            },

            getPropertiesCargo() {
                return this.$store.getters['cargo/getPropertiesCargo']
            },

            getListArg() {
                return this.$store.getters['transport/getListArg'];
            },

            getListLoadingCar() {
                let loadingCar = this.$store.getters['cargo/getLoadingCar'];
                return this.checkLocaleAndGetList(loadingCar);
            },

            getListPermissions() {
                let permission = this.$store.getters['cargo/getPermission'];
                return this.checkLocaleAndGetList(permission);
            },

            getTypesPayment() {
                let paymentType = this.$store.getters['cargo/getPaymentType'];
                return this.checkLocaleAndGetList(paymentType);
            },

            getListCurrency() {
                return this.$store.getters['cargo/getListCurrency']
            },

            getListCostPer() {
                let costPer = this.$store.getters['cargo/getCostPer'];
                return this.checkLocaleAndGetList(costPer);
            },

            getListFormPayment() {
                let paymentForm = this.$store.getters['cargo/getPaymentForm'];
                return this.checkLocaleAndGetList(paymentForm);
            },

            getListTimePayment() {
                let paymentTime = this.$store.getters['cargo/getPaymentTime'];
                return this.checkLocaleAndGetList(paymentTime);
            },

            bodyTypeErrors() {
                const errors = [];

                if (!this.$v.bodyType.$dirty) return errors;
                !this.$v.bodyType.required && errors.push('Body type is required.');

                return errors;
            }
        },
        methods: {
            nextStep(n) {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    return;
                }

                let cargo = {
                    cost: this.cost, currency: this.currency, prepayment: this.prepayment
                };

                let propertiesCargo = {
                    bodyType: this.bodyType.name, type: 'bodyType', typesLoadingTruck: this.typesLoadingTruck,
                    typesUnloadingTruck: this.typesUnloadingTruck, permissions: this.permissions,
                    typePayment: this.typePayment, costPer: this.costPer,
                    paymentForm: this.paymentForm, paymentTime: this.paymentTime
                };

                this.$store.commit('cargo/setInitialCargo', Object.assign(this.getInitialCargo, cargo));

                let tempPropertiesCargo = Object.assign(this.getPropertiesCargo, propertiesCargo);

                this.$store.commit('cargo/setPropertiesCargo', tempPropertiesCargo);

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
