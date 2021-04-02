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
          Transport and Payment
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
            md="2"
            lg="2"
          >
            <v-subheader>
              Грузоподъёмность
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="carryingCapacityFrom"
              :error-messages="carryingCapacityFromErrors"
              color="blue-grey lighten-2"
              label="От"
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
              :error-messages="carryingCapacityUpToErrors"
              color="blue-grey lighten-2"
              label="До"
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
              Объём(м3)
            </v-subheader>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeFrom"
              filled
              clearable
              color="blue-grey lighten-2"
              label="От"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="5"
            lg="5"
          >
            <v-text-field
              v-model="volumeUpTo"
              filled
              clearable
              color="blue-grey lighten-2"
              label="До"
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
              Габариты
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
              filled
              clearable
              color="blue-grey lighten-2"
              label="Длинна"
            ></v-text-field>
          </v-col>

          <v-col
            cols="6"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="widthTransport"
              filled
              clearable
              color="blue-grey lighten-2"
              label="Ширина"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="3"
            lg="3"
          >
            <v-text-field
              v-model="heightTransport"
              filled
              clearable
              color="blue-grey lighten-2"
              label="Высота"
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
              hint="Выберите ADR"
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
                adr: '',
                bodyTypes: [],
                searchBodyType: null,
                typesLoadingTruck: [],
                typesUnloadingTruck: [],
                permissions: [],
                typePayment: null,
                cost: null,
                currency: null,
                costPer: null,
                paymentForm: null,
                paymentTime: null,
                prepayment: null,
                isLoading: false,
                valid: true
            }
        },
        created() {
            this.bodyTypes = typesBody;
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

            getInitialTransport() {
                return this.$store.getters['transport/getInitialTransport']
            },

            getListArg() {
                return this.$store.getters['transport/getListArg']
            },

            getListLoadingCar() {
                return this.$store.getters['transport/getListLoadingCar']
            },

            getListPermissions() {
                return this.$store.getters['transport/getListPermissions']
            },

            getTypesPayment() {
                return this.$store.getters['transport/getTypesPayment']
            },

            getListCurrency() {
                return this.$store.getters['transport/getListCurrency']
            },

            getListCostPer() {
                return this.$store.getters['transport/getListCostPer']
            },

            getListFormPayment() {
                return this.$store.getters['transport/getListFormPayment']
            },

            getListTimePayment() {
                return this.$store.getters['transport/getListTimePayment']
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
                    bodyType: this.bodyType.name,
                    carryingCapacityFrom: this.carryingCapacityFrom,
                    carryingCapacityUpTo: this.carryingCapacityUpTo,
                    volumeFrom: this.volumeFrom,
                    volumeUpTo: this.volumeUpTo,
                    lengthTransport: this.lengthTransport,
                    widthTransport: this.widthTransport,
                    heightTransport: this.heightTransport,
                    adr: this.adr,
                    cost: this.cost,
                    currency: this.currency,
                    prepayment: this.prepayment
                };

                let propertiesTransport = {
                    typesLoadingTruck: this.typesLoadingTruck, typesUnloadingTruck: this.typesUnloadingTruck,
                    permissions: this.permissions, typePayment: this.typePayment, costPer: this.costPer,
                    paymentForm: this.paymentForm, paymentTime: this.paymentTime
                };

                Object.assign(this.getInitialTransport, transport);

                let tempPropertiesTransport = Object.assign({}, propertiesTransport);
                this.$store.commit('transport/setPropertiesTransport', tempPropertiesTransport);

                if (n === this.steps) {
                    this.setE1(1);
                } else {
                    this.setE1(n + 1);
                }
            },
        }
    }
</script>

<style scoped>

</style>
