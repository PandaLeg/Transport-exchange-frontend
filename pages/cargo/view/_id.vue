<template>
  <v-container>
    <v-row justify="center">
      <v-col
        lg="8"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="{path: getPathToSearch, query: queryResultSearch}"
                       class="subtitle-font nuxt-link-active">
              <fa-icon :icon="faAngleLeft"></fa-icon>
              К результатам поиска
            </nuxt-link>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col
              lg="8"
            >
              <v-card-subtitle class="spectral-font">Заявка опубликована - 13 марта</v-card-subtitle>
            </v-col>
            <v-col
              lg="4"
            >
              <v-btn
                outlined
                color="red accent-2"
                class="white--text subtitle-font mt-2"
                @click=""
              >
                Откликнуться
              </v-btn>
            </v-col>
          </v-row>
          <v-card-title class="name-font">{{ cargoView.name }}</v-card-title>
          <v-card-text>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Откуда:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                <template v-for="point in getPointsCargo">
                  <span
                    v-if="point.cityFrom !== null && point.countryFrom !== null"
                    class="spectral-font text--primary"
                  >
                    {{ point.cityFrom }}, {{ point.countryFrom }} <br>
                  </span>
                </template>
              </v-col>
            </v-row>
            <v-row justify="start">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Куда:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                <template v-for="point in getPointsCargo">
                  <span
                    v-if="point.cityTo !== null && point.countryTo !== null"
                    class="spectral-font text--primary"
                  >
                    {{ point.cityTo }}, {{ point.countryTo }} <br>
                  </span>
                </template>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Расстояние:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    class="spectral-font text--primary">
                    <div id="directions-cargo-panel"></div>
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Дата загрузки:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    class="spectral-font text--primary">
                    с {{ parseDate.loadingDateFrom}} по {{ parseDate.loadingDateBy }}
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Масса:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                <span
                  v-if="cargoView.weightFrom === cargoView.weightUpTo ||
                  cargoView.weightFrom === null || cargoView.weightUpTo === null"
                  class="spectral-font text--primary"
                >
                    {{ cargoView.weightFrom}} т
                </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ cargoView.weightFrom}} - {{ cargoView.weightUpTo }} т
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.volumeFrom !== null || cargoView.volumeUpTo !== null">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Объём:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-if="cargoView.volumeFrom === cargoView.volumeUpTo ||
                    cargoView.volumeFrom === null || cargoView.volumeUpTo === null"
                    class="spectral-font text--primary"
                  >
                    {{ cargoView.volumeFrom}} м3
                  </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ cargoView.volumeFrom}} - {{ cargoView.volumeUpTo }} м3
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.lengthCargo !== null || cargoView.widthCargo !== null ||
            cargoView.heightCargo !== null">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Габариты:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                <span
                  v-if="cargoView.lengthCargo !== null && cargoView.widthCargo !== null &&
                    cargoView.heightCargo !== null"
                  class="spectral-font text--primary"
                >
                  {{ cargoView.lengthCargo }} м д., {{ cargoView.widthCargo }} м ш., {{ cargoView.heightCargo }} м в.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== null && cargoView.widthCargo === null &&
                  cargoView.heightCargo === null"
                >
                   {{ cargoView.lengthCargo }} м д.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === null && cargoView.widthCargo !== null &&
                  cargoView.heightCargo === null"
                >
                   {{ cargoView.widthCargo }} м ш.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === null && cargoView.widthCargo === null &&
                  cargoView.heightCargo !== null"
                >
                   {{ cargoView.heightCargo }} м в.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== null && cargoView.widthCargo !== null &&
                  cargoView.heightCargo === null"
                >
                   {{ cargoView.lengthCargo }} м д., {{ cargoView.widthCargo }} м ш.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo !== null && cargoView.widthCargo === null &&
                  cargoView.heightCargo != null"
                >
                   {{ cargoView.lengthCargo }} м д., {{ cargoView.heightCargo }} м в.
                </span>
                <span
                  v-else-if="cargoView.lengthCargo === null && cargoView.widthCargo !== null &&
                  cargoView.heightCargo !== null"
                >
                   {{ cargoView.widthCargo }} м ш., {{ cargoView.heightCargo }} м в.
                </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="cargoView.adr !== null && cargoView.adr !== ''">
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">ADR:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span class="spectral-font text--primary">
                    {{ cargoView.adr}}
                  </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="12"
              >
                <span class="photo-font text--primary">Транспорт</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Тип кузова:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    class="spectral-font text--primary">
                    {{ cargoView.bodyType }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkLoading"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Загрузка:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'loading'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkUnloading"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Выгрузка:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'unloading'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPermissionType"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Разрешения:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'permissionType'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkTypePayment"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Тип оплаты:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'typePayment'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkCostPer"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Стоимость:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'costPer'"
                    class="spectral-font text--primary">
                    {{ cargoView.cost }} {{ cargoView.currency }} / {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPaymentForm"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Форма оплаты:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'paymentForm'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row
              v-if="checkPaymentTime"
            >
              <v-col
                cols="12"
                sm="2"
                md="2"
                lg="2"
              >
                <span class="subtitle-font">Момент оплаты:</span>
              </v-col>
              <v-col
                cols="12"
                sm="10"
                md="10"
                lg="10"
              >
                  <span
                    v-for="prop in cargoView.propertiesCargo"
                    :key="prop.id"
                    v-if="prop.property === 'paymentTime'"
                    class="spectral-font text--primary">
                    {{ prop.ruName }}
                  </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="12"
              >
                <span class="photo-font text--primary">Фото</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                lg="4"
                v-for="photo in getPhotoCargo"
                :key="photo.id"
              >
                <v-card
                  @click="dialog = true"
                >
                  <v-img
                    :src="photo.photoUrl"
                    aspect-ratio="1.7"
                    cover
                  >
                  </v-img>
                </v-card>
              </v-col>
            </v-row>

            <v-dialog
              v-model="dialog"
              transition="dialog-top-transition"
              max-width="800"
              max-height="500"
            >
              <v-card>
                <v-toolbar
                  color="primary"
                  dark
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    icon
                    @click="dialog = false"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-carousel
                  height="500"
                  show-arrows-on-hover
                >
                  <v-carousel-item
                    v-for="photo in getPhotoCargo"
                    :key="photo.id"
                  >
                    <v-img
                      :src="photo.photoUrl"
                    >
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card>
            </v-dialog>

            <v-row>
              <v-col
                lg="12"
              >
                <div id="map"></div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col
        lg="4"
      >
        <v-card v-if="checkUser">
          <v-card-title>
            <nuxt-link :to="{path: getPathToSearch, query: queryResultSearch}"
                       class="subtitle-font nuxt-link-active">
              Профиль
            </nuxt-link>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="photo-font">Контактная информация</v-card-title>

          <v-card-text>
            <div class="subtitle-font mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  ФИО:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                <span class="spectral-font text--primary">
                  {{ userFromCargo.firstName }}
                  {{ userFromCargo.lastName }}
                  {{ userFromCargo.patronymic }}
                </span>
                </v-col>
              </v-row>
            </div>
            <div class="subtitle-font mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  Эл. почта:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                  <span class="spectral-font text--primary">{{ userFromCargo.email }}</span>
                </v-col>
              </v-row>
            </div>

            <div class="subtitle-font mt-3">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="4"
                >
                  Местоположение:
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  lg="8"
                >
                  <span class="spectral-font text--primary">{{ userFromCargo.city }}, {{ userFromCargo.country }}</span>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
    import {parseCargoDate} from '../../../service/cargo/parseDate'
    import * as VueGoogleMaps from 'vue2-google-maps'

    export default {
        name: "cargo-view-id",
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        async fetch({store, params}) {
            if (Object.keys(store.getters['cargo/getCargoView']).length !== 0) {
                if (store.getters['cargo/getCargoView'].id !== Number(params.id)) {
                    await store.dispatch('cargo/getCargoAction', params.id);
                    await store.dispatch('cargo/getPhotoCargoAction', params.id);
                }
            } else {
                await store.dispatch('cargo/getCargoAction', params.id);
                await store.dispatch('cargo/getPhotoCargoAction', params.id);
            }
        },
        data() {
            return {
                id: '',
                checkLoading: false,
                checkUnloading: false,
                checkPermissionType: false,
                checkTypePayment: false,
                checkCostPer: false,
                checkPaymentForm: false,
                checkPaymentTime: false,
                dialog: false,
                queryResultSearch: {},
                distance: 0,
                center: {lat: 55.75222, lng: 37.61556},
                markers: [
                    {
                        position: {lat: 50.45466, lng: 30.5238}
                    },
                    {
                        position: {lat: 55.75222, lng: 37.61556}
                    },
                    {
                        position: {lat: 53.9, lng: 27.56667}
                    }
                ],
                path: [
                    {lat: 50.45466, lng: 30.5238},
                    {lat: 55.75222, lng: 37.61556},
                    {lat: 53.9, lng: 27.56667}
                ],
                map: null
            }
        },
        computed: {
            cargoView() {
                return this.$store.getters['cargo/getCargoView']
            },

            userFromCargo() {
                return this.$store.getters['cargo/getUserFromCargo']
            },

            checkUser() {
                return this.$store.getters['cargo/checkUser']
            },

            faAngleLeft() {
                return faAngleLeft
            },

            getPageSize() {
                return this.$store.getters['cargo/getPageSize']
            },

            getPathToSearch() {
                return this.$store.getters['cargo/getPathToSearch']
            },

            parseDate() {
                let loadingDateFrom = this.cargoView.loadingDateFrom;
                let loadingDateBy = this.cargoView.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy);
            },

            getPointsCargo() {
                return this.$store.getters['cargo/getPointsCargo']
            },

            getPhotoCargo() {
                return this.$store.getters['cargo/getPhotoCargo']
            },

            google: VueGoogleMaps.gmapApi,
        },
        created() {
            this.$store.commit('cargo/setResultDataSearch');
        },
        methods: {
            checkFullnessProperties() {
                this.cargoView.propertiesCargo.forEach(prop => {
                    if (prop.property === 'loading') {
                        this.checkLoading = true;
                    }
                    if (prop.property === 'unloading') {
                        this.checkUnloading = true;
                    }
                    if (prop.property === 'permissionType') {
                        this.checkPermissionType = true;
                    }
                    if (prop.property === 'typePayment') {
                        this.checkTypePayment = true;
                    }
                    if (prop.property === 'costPer') {
                        this.checkCostPer = true;
                    }
                    if (prop.property === 'paymentForm') {
                        this.checkPaymentForm = true;
                    }
                    if (prop.property === 'paymentTime') {
                        this.checkPaymentTime = true;
                    }

                });
            },

            initMap() {
                this.$gmapApiPromiseLazy().then(() => {
                    let dS = new this.google.maps.DirectionsService();
                    let dR = new this.google.maps.DirectionsRenderer();
                    let waypts = [];
                    let dist = 0;

                    const summaryPanel = document.getElementById("directions-cargo-panel");
                    summaryPanel.innerHTML = "";

                    this.map = new this.google.maps.Map(document.getElementById("map"), {
                        center: this.center,
                        zoom: 7,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullScreenControl: true,
                        zoomControl: true
                    });

                    dR.setMap(this.map);

                    for (let i = 1; i < this.getPointsCargo.length; i++) {
                        if (this.getPointsCargo[i].cityFrom !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsCargo[i].latFirstPoint,
                                    lng: this.getPointsCargo[i].lngFirstPoint
                                },
                                stopover: true
                            });
                        }

                        if (this.getPointsCargo[i].cityTo !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsCargo[i].latSecondPoint,
                                    lng: this.getPointsCargo[i].lngSecondPoint
                                },
                                stopover: true
                            });
                        }
                    }

                    let request = {
                        origin: {
                            lat: this.getPointsCargo[0].latFirstPoint,
                            lng: this.getPointsCargo[0].lngFirstPoint
                        },
                        destination: {
                            lat: this.getPointsCargo[0].latSecondPoint,
                            lng: this.getPointsCargo[0].lngSecondPoint
                        },
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: 'DRIVING'
                    };

                    dS.route(request, function (response, status) {
                        if (status === 'OK' && response) {
                            dR.setDirections(response);

                            const route = response.routes[0];

                            for (let i = 0; i < route.legs.length; i++) {
                                // С помощью replace убираем пробелы для больших чисел, чтобы преобразовать строку
                                // в число
                                dist += parseFloat(route.legs[i].distance.text
                                    .substring(0, route.legs[i].distance.text.lastIndexOf(' ')).replace(/\s+/g, ''));
                            }
                            summaryPanel.innerHTML = "~" + dist + route.legs[0].distance.text
                                .substring(route.legs[0].distance.text.lastIndexOf(' '));
                        }
                    });
                })
            },

            setMarker(Points) {
                this.$gmapApiPromiseLazy().then(() => {
                    const markers = new this.google.maps.Marker({
                        position: Points,
                        map: this.map
                    })
                });
            }
        },
        mounted() {
            const resultData = this.$store.getters['cargo/getDataResultSearch'];
            const data = {...resultData.data};
            this.queryResultSearch = Object.assign({}, {page: resultData.page}, {pageSize: resultData.pageSize}, data);
            this.parseDate;
            this.checkFullnessProperties();
            this.initMap();
            /*this.setMarker({lat: this.cargoView.latFirst, lng: this.cargoView.lngFirst});
            this.setMarker({lat: this.cargoView.latSecond, lng: this.cargoView.lngSecond});*/
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .name-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 28px;
  }

  .photo-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 18px;
  }

  .subtitle-font {
    font-family: 'Vollkorn', serif;
    font-weight: normal;
    font-size: 16px;
  }

  .spectral-font {
    font-family: 'Spectral', serif;
    font-weight: bold;
    font-size: 18px;
  }

  .nuxt-link-active {
    text-decoration: none;
  }

  #map {
    height: 600px;
  }
</style>
