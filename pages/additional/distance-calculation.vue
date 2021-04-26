<template>
  <div>
    <v-row justify="center">
      <v-col lg="11">
        <v-card
          dark
        >
          <v-row>
            <v-col
              lg="4"
            >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="11"
                      lg="11"
                    >
                      <v-autocomplete
                        v-model="firstLoadingPoint"
                        :items="entriesFirstLoadingPoint"
                        :loading="isLoadingFirstPointFrom"
                        :search-input.sync="searchFirstLoadingPoint"
                        color="white"
                        hide-no-data
                        hide-selected
                        clearable
                        item-text="fields.alternate_names"
                        item-value="recordid"
                        label="Откуда"
                        placeholder="Пункт №1"
                        filled
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

                  <v-row
                    v-if="checkFilledSecondPointFrom"
                  >
                    <v-col
                      cols="12"
                      md="11"
                      lg="11"
                    >
                      <v-autocomplete
                        v-model="secondLoadingPoint"
                        :items="entriesSecondLoadingPoint"
                        :loading="isLoadingSecondPointFrom"
                        :search-input.sync="searchSecondLoadingPoint"
                        color="white"
                        hide-no-data
                        hide-selected
                        clearable
                        item-text="fields.alternate_names"
                        item-value="recordid"
                        label="Выберите место загрузки"
                        placeholder="Пункт №2"
                        filled
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
                      md="1"
                      lg="1"
                    >
                      <v-btn
                        icon
                        smalll
                        color="error"
                        fab
                        @click="deleteLoadingPoint('secondLoading')"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row
                    v-if="checkFilledTwoPointLoading && countOpenedField !== 6"
                  >
                    <v-col
                      cols="12"
                      md="11"
                      lg="11"
                    >
                      <v-btn
                        class="marg-b ma-2 white--text"
                        @click="addNextFieldPointFrom"
                      >
                        Добавить
                        <v-icon
                          right
                          white
                        >
                          add
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      md="11"
                      lg="11"
                    >
                      <v-autocomplete
                        v-model="firstUnloadingPoint"
                        :items="entriesFirstUnloadingPoint"
                        :loading="isLoadingFirstPointTo"
                        :search-input.sync="searchFirstUnloadingPoint"
                        color="white"
                        hide-no-data
                        hide-selected
                        clearable
                        item-text="fields.alternate_names"
                        item-value="recordid"
                        label="Куда"
                        placeholder="Пункт №1"
                        filled
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
                </v-container>
              </v-form>

              <v-container>
                <v-row justify="start">
                  <v-col
                    v-if="checkCalculation"
                    cols="12"
                    sm="12"
                    md="12"
                    lg="12"
                  >
                    <span class="subtitle-font">Расстояние:</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    lg="6"
                  >
                  <span
                    class="spectral-font">
                    <div id="directions-transport-panel">
                    </div>
                  </span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    lg="6"
                  >
                  <span
                    class="spectral-font">
                    <div id="durations-transport-panel">
                    </div>
                  </span>
                  </v-col>
                </v-row>

                <!--<v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                        <v-row
                          justify="space-between"
                        >
                          <v-col cols="5">
                            Расчёт топлива
                          </v-col>
                          <v-col
                            cols="7"
                            class="text&#45;&#45;white"
                          >
                            <v-fade-transition leave-absolute>
                              <span
                                v-if="open"
                                key="0"
                              >
                                Заполните поля
                              </span>
                            </v-fade-transition>
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="consumption"
                            placeholder="Расход л/км"
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          lg="6"
                        >
                          <v-text-field
                            v-model="cost"
                            placeholder="Стоимость 1л"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>-->
              </v-container>

              <v-container
                class="mt-5"
              >
                <v-btn
                  color="primary"
                  @click="calcRoute"
                >
                  Расчитать
                </v-btn>
              </v-container>
            </v-col>

            <v-col
              cols="8"
              md="8"
              lg="8"
            >
              <div id="map"></div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import * as VueGoogleMaps from 'vue2-google-maps'
    import {ConvertSecondsToDhm} from '../../service/convertSecondsToDhm'

    export default {
        name: "distance-calculation",
        data() {
            return {
                firstLoadingPoint: null,
                secondLoadingPoint: null,
                firstUnloadingPoint: null,
                isLoadingFirstPointFrom: false,
                isLoadingSecondPointFrom: false,
                isLoadingFirstPointTo: false,
                searchFirstLoadingPoint: null,
                searchSecondLoadingPoint: null,
                searchFirstUnloadingPoint: null,
                entriesFirstLoadingPoint: [],
                entriesSecondLoadingPoint: [],
                entriesFirstUnloadingPoint: [],
                valid: false,
                checkFilledTwoPointLoading: false,
                checkFilledTwoPointUnloading: false,
                checkFilledSecondPointFrom: false,
                countOpenedField: 2,
                center: {lat: 55.75222, lng: 37.61556},
                directionsService: null,
                directionsRenderer: null,
                map: null,
                checkCalculation: false,
                consumption: '',
                cost: ''

            }
        },
        computed: {
            google: VueGoogleMaps.gmapApi
        },
        watch: {
            firstLoadingPoint() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6) {
                    this.checkFilledTwoPointLoading = true;
                    this.checkFilledTwoPointUnloading = true;
                }
            },
            firstUnloadingPoint() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && this.countOpenedField !== 6) {
                    this.checkFilledTwoPointLoading = true;
                    this.checkFilledTwoPointUnloading = true;
                }
            },

            secondLoadingPoint() {
                this.checkFilledLoadingFields(this.secondLoadingPoint);
            },

            searchFirstLoadingPoint(val) {
                let checkFilled = false;

                if (this.entriesFirstLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFirstLoadingPoint.length; i++) {
                        if (this.firstLoadingPoint === this.entriesFirstLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFirstPointFrom) return;

                    this.isLoadingFirstPointFrom = true;

                    console.log("FIRST SEARCH", val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFirstLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFirstPointFrom = false))
                }
            },

            searchSecondLoadingPoint(val) {
                let checkFilled = false;

                if (this.entriesSecondLoadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesSecondLoadingPoint.length; i++) {
                        if (this.secondLoadingPoint === this.entriesSecondLoadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingSecondPointFrom) return;

                    this.isLoadingSecondPointFrom = true;

                    console.log("SECOND SEARCH", val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesSecondLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingSecondPointFrom = false))
                }
            },

            searchFirstUnloadingPoint(val) {
                let checkFilled = false;
                if (this.entriesFirstUnloadingPoint.length > 0) {
                    for (let i = 0; i < this.entriesFirstUnloadingPoint.length; i++) {
                        if (this.firstUnloadingPoint === this.entriesFirstUnloadingPoint[i]) {
                            checkFilled = true;
                        }
                    }
                }

                if (!checkFilled) {
                    // Items have already been requested
                    if (this.isLoadingFirstPointTo) return;

                    this.isLoadingFirstPointTo = true;

                    console.log(val);
                    // Lazily load input items
                    fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=' +
                        val + '&lang=ru&rows=50')
                        .then(res => res.json())
                        .then(res => {
                            this.entriesFirstUnloadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFirstPointTo = false))
                }
            },
        },
        methods: {
            initMap() {
                this.$gmapApiPromiseLazy().then(() => {
                    const directionsService = new this.google.maps.DirectionsService();
                    const directionsRenderer = new this.google.maps.DirectionsRenderer();

                    const center = new this.google.maps.LatLng(50.45466, 30.5238);

                    const mapOptions = {
                        center: center,
                        zoom: 7,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullScreenControl: true,
                        zoomControl: true
                    };

                    this.map = new this.google.maps.Map(document.getElementById("map"), mapOptions);

                    directionsRenderer.setMap(this.map);

                    this.directionsRenderer = directionsRenderer;
                    this.directionsService = directionsService;
                })
            },

            calcRoute() {
                this.$gmapApiPromiseLazy().then(() => {
                    const dr = this.directionsRenderer;
                    let points = [
                        this.secondLoadingPoint,
                    ];
                    let waypts = [];

                    let start = {
                        lat: this.firstLoadingPoint.fields.coordinates[0],
                        lng: this.firstLoadingPoint.fields.coordinates[1]
                    };
                    let end = {
                        lat: this.firstUnloadingPoint.fields.coordinates[0],
                        lng: this.firstUnloadingPoint.fields.coordinates[1]
                    };
                    let dist = 0;
                    let duration = 0;

                    const distancePanel = document.getElementById("directions-transport-panel");
                    const durationPanel = document.getElementById("durations-transport-panel");
                    distancePanel.innerHTML = "";
                    durationPanel.innerHTML = "";

                    points.forEach(item => {
                        if (item !== null) {
                            waypts.push({
                                location: {
                                    lat: item.fields.coordinates[0],
                                    lng: item.fields.coordinates[1]
                                },
                                stopover: true
                            });
                        }
                    });

                    let request = {
                        origin: start,
                        destination: end,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'
                    };


                    this.directionsService.route(request, function (response, status) {
                        if (status === 'OK' && response) {
                            console.log("ROUTE OK", response);
                            dr.setDirections(response);

                            const route = response.routes[0];

                            for (let i = 0; i < route.legs.length; i++) {
                                // С помощью replace убираем пробелы для больших чисел, чтобы преобразовать строку
                                // в число
                                dist += parseFloat(route.legs[i].distance.text
                                    .substring(0, route.legs[i].distance.text.lastIndexOf(' ')).replace(/\s+/g, ''));
                                duration += route.legs[i].duration.value;
                            }
                            distancePanel.innerHTML = "~" + dist + route.legs[0].distance.text
                                .substring(route.legs[0].distance.text.lastIndexOf(' '));
                            console.log(duration);
                            durationPanel.innerHTML = ConvertSecondsToDhm.convert(duration);
                        }
                    });
                    this.checkCalculation = true;
                });
            },

            setMarker(Points) {
                this.$gmapApiPromiseLazy().then(() => {
                    const markers = new this.google.maps.Marker({
                        position: Points,
                        map: this.map
                    })
                });
            },

            addNextFieldPointFrom() {
                if (this.firstLoadingPoint && this.firstUnloadingPoint && !this.checkFilledSecondPointFrom) {
                    this.checkFilledSecondPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && !this.checkFilledThirdPointFrom) {
                    this.checkFilledThirdPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && this.checkFilledThirdPointFrom && !this.checkFilledFourthPointFrom) {
                    this.checkFilledFourthPointFrom = true;
                    this.countOpenedField++;
                } else if (this.firstLoadingPoint && this.firstUnloadingPoint && this.checkFilledSecondPointFrom
                    && this.checkFilledThirdPointFrom && this.checkFilledFourthPointFrom
                    && !this.checkFilledFifthPointFrom) {
                    this.checkFilledFifthPointFrom = true;
                    this.countOpenedField++;
                }

                this.checkFilledTwoPointLoading = false;
            },

            deleteLoadingPoint(checkField) {
                this.checkFilledTwoPointLoading = true;
                this.checkFilledTwoPointUnloading = true;

                if (checkField === 'secondLoading') {
                    this.checkFilledSecondPointFrom = false;
                    this.secondLoadingPoint = null;
                }

                if (checkField === 'thirdLoading') {
                    this.checkFilledThirdPointFrom = false;
                    this.thirdLoadingPoint = null;
                }

                if (checkField === 'fourthLoading') {
                    this.checkFilledFourthPointFrom = false;
                    this.fourthLoadingPoint = null;
                }

                if (checkField === 'fifthLoading') {
                    this.checkFilledFifthPointFrom = false;
                    this.fifthLoadingPoint = null;
                }

                this.countOpenedField--;
            },

            checkFilledLoadingFields(value) {
                if (!this.checkFilledTwoPointLoading) {
                    this.checkFilledTwoPointLoading = !!(value && this.countOpenedField !== 6)
                }
            },
        },
        mounted() {
            this.initMap();
        }
    }
</script>

<style scoped>
  #map {
    height: 600px;
  }

  .marg-b {
    float: right;
  }
</style>
