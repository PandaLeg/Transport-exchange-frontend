<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8">
        <v-card
        >
          <v-card-title class="headline primary white--text">
            <fa-icon :icon="faTruckLoading" class="mr-6">
              search
            </fa-icon>
            <span class="title-font">{{ $t('searchCargo.title') }}</span>
          </v-card-title>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-autocomplete
                  v-if="lang === 'ru'"
                  v-model="countryFrom"
                  :items="getCountries"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="ruName"
                  item-value="id"
                  :label="$t('searchCargo.selectCountry')"
                  :hint="$t('searchCargo.fromWhere')"
                  persistent-hint
                  outlined
                  required
                  return-object
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <span v-text="item.enName"></span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-icon left color="primary">mdi-flag</v-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.ruName"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>

                <v-autocomplete
                  v-else
                  v-model="countryFrom"
                  :items="getCountries"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="enName"
                  item-value="id"
                  :label="$t('searchCargo.selectCountry')"
                  :hint="$t('searchCargo.fromWhere')"
                  persistent-hint
                  outlined
                  required
                  return-object
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <span v-text="item.enName"></span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-icon left color="primary">mdi-flag</v-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.enName"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-autocomplete
                  v-if="lang === 'ru'"
                  v-model="countryTo"
                  :items="getCountries"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="ruName"
                  item-value="id"
                  :label="$t('searchCargo.selectCountry')"
                  :hint="$t('searchCargo.whereTo')"
                  persistent-hint
                  outlined
                  required
                  return-object
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <span v-text="item.enName"></span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-icon left color="primary">mdi-flag</v-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.ruName"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>

                <v-autocomplete
                  v-else
                  v-model="countryTo"
                  :items="getCountries"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="enName"
                  item-value="id"
                  :label="$t('searchCargo.selectCountry')"
                  :hint="$t('searchCargo.whereTo')"
                  persistent-hint
                  outlined
                  required
                  return-object
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <span v-text="item.enName"></span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-icon left color="primary">mdi-flag</v-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.enName"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-autocomplete
                  v-model="cityFrom"
                  :items="getCitiesFrom"
                  :loading="loadingCityFrom"
                  :search-input.sync="searchCityFrom"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="fields.alternate_names"
                  item-value="recordid"
                  :label="$t('searchCargo.selectCity')"
                  :hint="$t('searchCargo.fromWhere')"
                  persistent-hint
                  outlined
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
              </v-col>

              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-autocomplete
                  v-model="cityTo"
                  :items="getCitiesTo"
                  :loading="loadingCityTo"
                  :search-input.sync="searchCityTo"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="fields.alternate_names"
                  item-value="recordid"
                  :label="$t('searchCargo.selectCity')"
                  :hint="$t('searchCargo.whereTo')"
                  persistent-hint
                  outlined
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
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="loadingDateFrom"
                      :label="$t('searchCargo.dateFrom')"
                      prepend-icon="mdi-calendar"
                      class="subtitle-font"
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="loadingDateFrom"
                    @input="menu=false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="loadingDateBy"
                      :label="$t('searchCargo.dateBy')"
                      prepend-icon="mdi-calendar"
                      class="subtitle-font"
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="loadingDateBy"
                    @input="menu2=false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                md="3"
                lg="3"
              >
                <v-text-field
                  v-model="weightFrom"
                  color="blue-grey lighten-2"
                  :label="$t('searchCargo.weightFrom')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="3"
              >
                <v-text-field
                  v-model="weightUpTo"
                  color="blue-grey lighten-2"
                  :label="$t('searchCargo.weightUpTo')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="3"
                lg="3"
              >
                <v-text-field
                  v-model="volumeFrom"
                  color="blue-grey lighten-2"
                  :label="$t('searchCargo.volumeFrom')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                lg="3"
                md="3"
              >
                <v-text-field
                  v-model="volumeUpTo"
                  color="blue-grey lighten-2"
                  :label="$t('searchCargo.volumeUpTo')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                lg="6"
                md="6"
              >
                <v-autocomplete
                  v-model="nameCargo"
                  :items="itemsNamesCargo"
                  :loading="loadingNameCargo"
                  :search-input.sync="searchName"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="name"
                  item-value="id"
                  :label="$t('searchCargo.selectCargoName')"
                  :hint="$t('searchCargo.search')"
                  outlined
                  required
                  return-object
                >
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <span v-text="item.name"></span>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-icon left color="primary">mdi-flag</v-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                lg="6"
                md="6"
              >
                <v-autocomplete
                  v-model="bodyType"
                  :items="bodyTypes"
                  :loading="loadingBodyType"
                  :search-input.sync="searchBodyType"
                  color="blue-grey lighten-2"
                  class="subtitle-font"
                  hide-no-data
                  hide-selected
                  clearable
                  item-text="name"
                  item-value="id"
                  :label="$t('searchCargo.selectBodyType')"
                  :hint="$t('searchCargo.search')"
                  outlined
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
                md="6"
                lg="6"
              >
                <v-select
                  v-model="paymentForm"
                  :items="getListFormPayment"
                  :menu-props="{ bottom: true, offsetY: true }"
                  :label="$t('searchCargo.selectPaymentForm')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-select>
              </v-col>

              <v-col
                cols="12"
                md="6"
                lg="6"
              >
                <v-select
                  v-model="paymentTime"
                  :items="getListTimePayment"
                  :menu-props="{ bottom: true, offsetY: true }"
                  :label="$t('searchCargo.selectPaymentTime')"
                  class="subtitle-font"
                  outlined
                  clearable
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="red accent-2"
              class="white--text subtitle-font"
              outlined
              @click="searchCargo"
            >
              {{ $t('searchCargo.search') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {faTruckLoading} from '@fortawesome/free-solid-svg-icons'
    import {faTruckMoving} from '@fortawesome/free-solid-svg-icons'
    import {countries} from "../../../json/countries.json"
    import {names} from '../../../json/cargo.name.json'
    import {typesBody} from '../../../json/body.type.json'

    export default {
        name: "search-cargo",
        data() {
            return {
                countryFrom: null,
                countryTo: null,
                cityFrom: null,
                cityTo: null,
                countries: [],
                citiesFrom: [],
                citiesTo: [],
                itemsNamesCargo: [],
                bodyTypes: [],
                searchCityFrom: null,
                searchCityTo: null,
                searchName: null,
                searchBodyType: null,
                loadingCityFrom: false,
                loadingCityTo: false,
                loadingNameCargo: false,
                loadingBodyType: false,
                menu: false,
                menu2: false,
                loadingDateFrom: null,
                loadingDateBy: null,
                weightFrom: null,
                weightUpTo: null,
                volumeFrom: null,
                volumeUpTo: null,
                nameCargo: null,
                bodyType: null,
                paymentForm: null,
                paymentTime: null,
                lang: 'ru',
                valid: false
            }
        },
        created() {
            this.countries = countries;
            this.itemsNamesCargo = names;
            this.bodyTypes = typesBody;
        },
        computed: {
            faTruckLoading() {
                return faTruckLoading
            },

            faTruckMoving() {
                return faTruckMoving
            },

            getCountries() {
                return this.countries.map(country => {
                    return Object.assign({}, country)
                });
            },

            getCitiesFrom() {
                return this.citiesFrom;
            },

            getCitiesTo() {
                return this.citiesTo;
            },

            getListFormPayment() {
                let paymentForm = this.$store.getters['cargo/getPaymentForm'];
                return this.checkLocaleAndGetList(paymentForm);
            },

            getListTimePayment() {
                let paymentTime = this.$store.getters['cargo/getPaymentTime'];
                return this.checkLocaleAndGetList(paymentTime);
            },
        },
        watch: {
            countryTo() {
                this.checkFullFilledField()
            },

            countryFrom() {
                this.checkFullFilledField()
            },

            cityFrom() {
                this.checkFullFilledField()
            },

            cityTo() {
                this.checkFullFilledField()
            },

            async searchCityFrom(val) {
                let checkFilled = false;
                if (this.getCitiesFrom.length > 0) {
                    for (let i = 0; i < this.getCitiesFrom.length; i++) {
                        if (this.cityFrom === this.getCitiesFrom[i]) {
                            checkFilled = true;
                            this.valid = true;
                        }
                    }
                }

                if (!checkFilled) {
                    this.loadingCityFrom = true;

                    const result = await
                        this.$axios('https://public.opendatasoft.com/api/records/1.0/search/?dataset=' +
                            'geonames-all-cities-with-a-population-1000&q=' + val + '&lang=ru&rows=50');
                    const data = await result.data;

                    this.citiesFrom = data.records;

                    this.loadingCityFrom = false;
                }
            },

            async searchCityTo(val) {
                let checkFilled = false;
                if (this.getCitiesTo.length > 0) {
                    for (let i = 0; i < this.getCitiesTo.length; i++) {
                        if (this.cityTo === this.getCitiesTo[i]) {
                            checkFilled = true;
                            this.valid = true;
                        }
                    }
                }

                if (!checkFilled) {
                    this.loadingCityTo = true;

                    const result = await
                        this.$axios('https://public.opendatasoft.com/api/records/1.0/search/?dataset=' +
                            'geonames-all-cities-with-a-population-1000&q=' + val + '&lang=ru&rows=50');
                    const data = await result.data;

                    this.citiesTo = data.records;

                    this.loadingCityTo = false;
                }
            }
        },
        methods: {
            checkFullFilledField() {
                if (!this.countryTo && !this.countryFrom && !this.cityFrom && !this.cityTo) {
                    this.valid = false;
                }
                if (this.countryTo || this.countryFrom || this.cityFrom || this.cityTo) {
                    this.valid = true;
                }
            },

            searchCargo() {
                const cargo = Object.assign({},
                    {
                        page: 1
                    },
                    {
                        pageSize: undefined
                    },
                    {
                        countryFrom: this.countryFrom?.enName, countryTo: this.countryTo?.enName,
                        cityFrom: this.cityFrom?.fields.name, cityTo: this.cityTo?.fields.name
                    },
                    {
                        loadingDateFrom: this.loadingDateFrom ? this.loadingDateFrom : undefined, loadingDateBy:
                            this.loadingDateBy ? this.loadingDateBy : undefined
                    },
                    {
                        weightFrom: this.weightFrom ? this.weightFrom : undefined,
                        weightUpTo: this.weightUpTo ? this.weightUpTo : undefined,
                        volumeFrom: this.volumeFrom ? this.volumeUpTo : undefined,
                        volumeUpTo: this.volumeUpTo ? this.volumeUpTo : undefined,
                    },
                    {
                        nameCargo: this.nameCargo?.name, bodyType: this.bodyType?.name
                    },
                    {
                        paymentForm: this.paymentForm ? this.paymentForm : undefined,
                        paymentTime: this.paymentTime ? this.paymentTime : undefined
                    }
                );

                this.$store.commit('cargo/clearCargoAfterSearch');
                this.$router.push({path: (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
                        '/cargo/search-cargo/search', query: cargo})
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
  @import
  url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .title-font{
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 24px;
  }

  .subtitle-font{
    font-family: 'Roboto Slab', serif;
    font-weight: normal;
  }

</style>
