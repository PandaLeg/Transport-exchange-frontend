<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="12"
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
          <v-card-title class="name-font">{{ transportView.bodyType }}</v-card-title>
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
                <template v-for="point in getPointsTransport">
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
                <template v-for="point in getPointsTransport">
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
                    <div id="directions-transport-panel">

                    </div>
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
                  v-if="transportView.carryingCapacityFrom === transportView.carryingCapacityUpTo ||
                  transportView.carryingCapacityFrom === null || transportView.carryingCapacityUpTo === null"
                  class="spectral-font text--primary"
                >
                    {{ transportView.carryingCapacityFrom}} т
                </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ transportView.carryingCapacityFrom}} - {{ transportView.carryingCapacityUpTo }} т
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.volumeFrom !== null || transportView.volumeUpTo !== null">
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
                    v-if="transportView.volumeFrom === transportView.volumeUpTo ||
                    transportView.volumeFrom === null || transportView.volumeUpTo === null"
                    class="spectral-font text--primary"
                  >
                    {{ transportView.volumeFrom}} м3
                  </span>
                <span
                  v-else
                  class="spectral-font text--primary"
                >
                    {{ transportView.volumeFrom}} - {{ transportView.volumeUpTo }} м3
                  </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.lengthTransport !== null || transportView.widthTransport !== null ||
            transportView.heightTransport !== null">
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
                  v-if="transportView.lengthTransport !== null && transportView.widthTransport !== null &&
                    transportView.heightTransport !== null"
                  class="spectral-font text--primary"
                >
                  {{ transportView.lengthTransport }} м д., {{ transportView.widthTransport }} м ш.,
                  {{ transportView.heightTransport }} м в.
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== null && transportView.widthTransport === null &&
                  transportView.heightTransport === null"
                >
                   {{ transportView.lengthTransport }} м д.
                </span>
                <span
                  v-else-if="transportView.lengthTransport === null && transportView.widthTransport !== null &&
                  transportView.heightTransport === null"
                >
                   {{ transportView.widthTransport }} м ш.
                </span>
                <span
                  v-else-if="transportView.lengthTransport === null && transportView.widthTransport === null &&
                  transportView.heightTransport !== null"
                >
                   {{ transportView.heightTransport }} м в.
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== null && transportView.widthTransport !== null &&
                  transportView.heightTransport === null"
                >
                   {{ transportView.lengthTransport }} м д., {{ transportView.widthTransport }} м ш.
                </span>
                <span
                  v-else-if="transportView.lengthTransport !== null && transportView.widthTransport === null &&
                  transportView.heightTransport != null"
                >
                   {{ transportView.lengthTransport }} м д., {{ transportView.heightTransport }} м в.
                </span>
                <span
                  v-else-if="transportView.lengthTransport === null && transportView.widthTransport !== null &&
                  transportView.heightTransport !== null"
                >
                   {{ transportView.widthTransport }} м ш., {{ transportView.heightTransport }} м в.
                </span>
              </v-col>
            </v-row>

            <v-row justify="start" v-if="transportView.adr !== null && transportView.adr !== ''">
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
                    {{ transportView.adr}}
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
                    v-for="prop in transportView.propertiesTransport"
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
                    v-for="prop in transportView.propertiesTransport"
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
                    v-for="prop in transportView.propertiesTransport"
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
                    v-for="prop in transportView.propertiesTransport"
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
                    v-for="prop in transportView.propertiesTransport"
                    :key="prop.id"
                    v-if="prop.property === 'costPer'"
                    class="spectral-font text--primary">
                    {{ transportView.cost }} {{ transportView.currency }} / {{ prop.ruName }}
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
                    v-for="prop in transportView.propertiesTransport"
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
                    v-for="prop in transportView.propertiesTransport"
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
                v-for="photo in getPhotosTransport"
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
                    v-for="photo in getPhotosTransport"
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
        cols="12"
        lg="4"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="{path: getPathToSearch, query: queryResultSearch}"
                       class="subtitle-font nuxt-link-active">
              Профиль
            </nuxt-link>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="photo-font">Контактная информация</v-card-title>
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
        name: "transport-view-id",
        validate({params}) {
            return /^\d+$/.test(params.id);
        },
        async fetch({store, params}) {
            if (Object.keys(store.getters['transport/getTransportView']).length !== 0) {
                if (store.getters['transport/getTransportView'].id !== Number(params.id)) {
                    await store.dispatch('transport/getTransportAction', params.id);
                    await store.dispatch('transport/getPlacesTransportAction', params.id);
                    await store.dispatch('transport/getPhotosTransportAction', params.id);
                }
            } else {
                await store.dispatch('transport/getTransportAction', params.id);
                await store.dispatch('transport/getPlacesTransportAction', params.id);
                await store.dispatch('transport/getPhotosTransportAction', params.id);
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
        created() {
            this.$store.commit('transport/setResultDataSearch');
        },
        computed: {
            transportView() {
                return this.$store.getters['transport/getTransportView']
            },

            faAngleLeft() {
                return faAngleLeft
            },

            getPageSize() {
                return this.$store.getters['transport/getPageSize']
            },

            getPathToSearch() {
                return this.$store.getters['transport/getPathToSearch']
            },

            parseDate() {
                let loadingDateFrom = this.transportView.loadingDateFrom;
                let loadingDateBy = this.transportView.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy);
            },

            getPointsTransport() {
                return this.$store.getters['transport/getPointsTransport']
            },

            getPhotosTransport() {
                return this.$store.getters['transport/getPhotosTransport']
            },

            google: VueGoogleMaps.gmapApi,

            origin() {
                return {query: this.transportView.cityFirstLoadingPoint};
            },

            destination() {
                return {query: this.transportView.cityFirstUnloadingPoint};
            }
        },
        watch: {
            distance(val) {
                this.distance = val;
            }
        },
        methods: {
            checkFullnessProperties() {
                this.transportView.propertiesTransport.forEach(prop => {
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

                    const distancePanel = document.getElementById("directions-transport-panel");
                    distancePanel.innerHTML = "";

                    this.map = new this.google.maps.Map(document.getElementById("map"), {
                        center: this.center,
                        zoom: 7,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullScreenControl: true,
                        zoomControl: true
                    });

                    dR.setMap(this.map);

                    for (let i = 1; i < this.getPointsTransport.length; i++) {
                        if (this.getPointsTransport[i].cityFrom !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsTransport[i].latFirstPoint,
                                    lng: this.getPointsTransport[i].lngFirstPoint
                                },
                                stopover: true
                            });
                        }

                        if (this.getPointsTransport[i].cityTo !== null) {
                            waypts.push({
                                location: {
                                    lat: this.getPointsTransport[i].latSecondPoint,
                                    lng: this.getPointsTransport[i].lngSecondPoint
                                },
                                stopover: true
                            });
                        }
                    }

                    let request = {
                        origin: {
                            lat: this.getPointsTransport[0].latFirstPoint,
                            lng: this.getPointsTransport[0].lngFirstPoint
                        },
                        destination: {
                            lat: this.getPointsTransport[0].latSecondPoint,
                            lng: this.getPointsTransport[0].lngSecondPoint
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
                            distancePanel.innerHTML = "~" + dist + route.legs[0].distance.text
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
            const resultData = this.$store.getters['transport/getDataResultSearch'];
            const data = {...resultData.data};
            this.queryResultSearch = Object.assign({}, {page: resultData.page}, {pageSize: resultData.pageSize}, data);
            this.parseDate;
            this.checkFullnessProperties();
            this.initMap();
            /*this.setMarker({
                lat: this.getPointsTransport[0].latFirstPoint,
                lng: this.getPointsTransport[0].lngFirstPoint
            });
            this.setMarker({
                lat: this.getPointsTransport[0].latSecondPoint,
                lng: this.getPointsTransport[0].lngSecondPoint
            });*/
        }
    }
</script>

<style scoped>
  #map {
    height: 600px;
  }
</style>
