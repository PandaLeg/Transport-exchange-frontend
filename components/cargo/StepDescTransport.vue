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
          Транспорт и Оплата
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
              Транспорт
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
              Тип кузова
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
              label="Выберите тип кузова"
              placeholder="Поиск"
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
              Загрузка
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
              label="Выберите тип загрузки"
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
              Выгрузка
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
              label="Выберите тип выгрузки"
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
              Разрешения
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
              label="Выберите тип разрешения"
              filled
              clearable
              multiple
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-subheader inset>
              Оплата
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
              Тип оплаты
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
              label="Выберите тип оплаты"
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
              Стоимость
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
              label="Сумма"
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
              label="Валюта"
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
              label="Км"
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
              Форма оплаты
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
              label="Выберите форму оплаты"
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
              Момент оплаты
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
              label="Выберите момент оплаты"
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
              Предоплата
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
    import {typesBody} from '../../json/body.type.json'
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
                typesLoadingTruck: [],
                typesUnloadingTruck: [],
                permissions: [],
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
        validations:{
            bodyType: {
                required
            }
        },
        created(){
            this.bodyTypes = typesBody;
        },
        computed:{
            faArrowAltCircleRight() {
                return faArrowAltCircleRight
            },

            faTruckMoving() {
                return faTruckMoving
            },

            getInitialCargo(){
                return this.$store.getters['cargo/getInitialCargo']
            },

            getPropertiesCargo(){
                return this.$store.getters['cargo/getPropertiesCargo']
            },

            getListLoadingCar() {
                return this.$store.getters['cargo/getListLoadingCar']
            },

            getListPermissions() {
                return this.$store.getters['cargo/getListPermissions']
            },

            getTypesPayment() {
                return this.$store.getters['cargo/getTypesPayment']
            },

            getListCurrency() {
                return this.$store.getters['cargo/getListCurrency']
            },

            getListCostPer() {
                return this.$store.getters['cargo/getListCostPer']
            },

            getListFormPayment() {
                return this.$store.getters['cargo/getListFormPayment']
            },

            getListTimePayment() {
                return this.$store.getters['cargo/getListTimePayment']
            },

            bodyTypeErrors(){
                const errors = [];

                if (!this.$v.bodyType.$dirty) return errors;
                !this.$v.bodyType.required && errors.push('Body type is required.');

                return errors;
            }
        },
        methods: {
            nextStep(n) {
                if(this.$v.$invalid){
                    this.$v.$touch();
                    return;
                }

                let cargo = {
                    bodyType: this.bodyType.name, cost: this.cost, currency: this.currency, prepayment: this.prepayment
                };

                let propertiesCargo = {
                    typesLoadingTruck: this.typesLoadingTruck, typesUnloadingTruck: this.typesUnloadingTruck,
                    permissions: this.permissions, typePayment: this.typePayment, costPer: this.costPer,
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
        }
    }
</script>
