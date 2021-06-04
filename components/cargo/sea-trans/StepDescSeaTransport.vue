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
              Транспорт и разрешения
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
              Тип судна
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
              :error-messages="vesselTypeErrors"
              color="white"
              hide-no-data
              hide-selected
              clearable
              item-text="name"
              item-value="id"
              label="Выберите тип судна"
              :placeholder="$t('addCargo.search')"
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
              Инкотермс
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-select
              v-model="incoterms"
              :items="getIncoterms"
              :menu-props="{ bottom: true, offsetY: true }"
              label="Выберите тип"
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
              Загрузка контейнера
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="10"
            lg="10"
          >
            <v-combobox
              v-model="containerLoading"
              :items="getLoadingVessel"
              :menu-props="{ bottom: true, offsetY: true }"
              label="Выберите тип загрузки"
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
              filled
              clearable
              color="blue-grey lighten-2"
              :label="$t('addCargo.sum')"
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
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
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
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
              :disabled="!typePayment || typePayment === '' || typePayment === 'Запрос ставки'"
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
              filled
              clearable
              color="blue-grey lighten-2"
              label="50%"
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
    import {typesVessel} from '../../../json/vessel.type.json'
    import {validationMixin} from 'vuelidate'
    import {required} from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        props: ['n', 'e1', 'setE1', 'steps'],
        data() {
            return {
                bodyType: null,
                bodyTypes: [],
                searchBodyType: null,
                incoterms: '',
                containerLoading: [],
                typePayment: '',
                cost: '',
                currency: '',
                costPer: '',
                paymentForm: '',
                paymentTime: '',
                prepayment: '',
                isLoading: false,
                valid: true
            }
        },
        validations: {
            bodyType: {
                required
            }
        },
        created() {
            this.bodyTypes = typesVessel;
        },
        computed: {
            faArrowAltCircleRight() {
                return faArrowAltCircleRight
            },

            faTruckMoving() {
                return faTruckMoving
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

            getListPermissions() {
                let permission = this.$store.getters['cargo/getPermission'];
                return this.checkLocaleAndGetList(permission);
            },

            getLoadingVessel() {
                let loading = this.$store.getters['cargo/getLoadingVessel'];
                return this.checkLocaleAndGetList(loading);
            },

            getIncoterms() {
                return this.$store.getters['cargo/getIncoterms'];
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

            vesselTypeErrors() {
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
                    bodyType: this.bodyType.name, incoterms: this.incoterms, cost: this.cost,
                    currency: this.currency, prepayment: this.prepayment
                };

                let propertiesCargo = {
                    containerLoading: this.containerLoading, typePayment: this.typePayment, costPer: this.costPer,
                    paymentForm: this.paymentForm, paymentTime: this.paymentTime
                };

                Object.assign(this.getInitialCargo, cargo);

                let tempPropertiesCargo = Object.assign({}, propertiesCargo);
                this.$store.commit('cargo/setPropertiesCargo', tempPropertiesCargo);

                if (n === this.steps) {
                    this.setE1(1);
                } else {
                    this.setE1(n + 1);
                }
            },

            checkLocaleAndGetList(someObject) {
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
