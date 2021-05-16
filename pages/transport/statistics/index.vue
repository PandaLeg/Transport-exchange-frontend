<template>
  <div>
    <v-row justify="center">
      <v-col lg="11">
        <v-card
          dark
        >
          <v-row>
            <v-col
              md="5"
              lg="5"
            >

              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                    lg="12"
                  >
                    <v-data-table
                      :headers="headers"
                      :items="points"
                      sort-by="calories"
                      class="elevation-1"
                    >
                      <template v-slot:top>
                        <v-toolbar
                          flat
                        >
                          <v-toolbar-title>Статистика</v-toolbar-title>
                          <v-divider
                            class="mx-4"
                            inset
                            vertical
                          ></v-divider>
                          <v-spacer></v-spacer>
                        </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click=""
                        >
                          mdi-pencil
                        </v-icon>
                        <v-icon
                          small
                          @click=""
                        >
                          mdi-delete
                        </v-icon>
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col
              cols="8"
              md="7"
              lg="7"
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
    import {countries} from '../../../json/countries.json'

    export default {
        name: "index",
        data() {
            return {
                formData: null,
                headers: [
                    {
                        text: 'Страна',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: 'Из', value: 'loadingPointFrom'},
                    {text: 'В', value: 'loadingPointBy'},
                    {text: 'Внутренние', value: 'insidePoint'},
                ],
                points: []
            }
        },
        computed: {
            getPointsInside() {
                return this.$store.getters['transport/getPointsInside']
            },

            getPointsFrom() {
                return this.$store.getters['transport/getPointsFrom']
            },

            getPointsTo() {
                return this.$store.getters['transport/getPointsTo']
            },

            google: VueGoogleMaps.gmapApi
        },
        methods: {
            async getCountries() {
                this.formData = new FormData();

                let cs = countries.map(item => item.enName);

                this.formData.append('countries', new Blob([JSON.stringify(cs)], {type: "application/json"}));

                await this.$store.dispatch('transport/getCountPlaces', this.formData);

                setTimeout(this.filledAllOfferCargo(this.points), 1000);
            },

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
                })
            },
            filledAllOfferCargo(resultCountries) {
                let offer = {
                    name: '',
                    loadingPointFrom: '',
                    loadingPointBy: '',
                    insidePoint: ''
                };

                for (let i = 0; i < countries.length; i++) {
                    if (this.$i18n.localeProperties.code === 'en') {
                        offer = Object.assign({},
                            {name: countries[i].enName}
                        );
                    } else {
                        offer = Object.assign({},
                            {name: countries[i].ruName}
                        );
                    }

                    let checkHavePointFrom = Object.keys(this.getPointsFrom).find(item => item === countries[i].enName ?
                        item : null);

                    let checkHavePointTo = Object.keys(this.getPointsTo).find(item => item === countries[i].enName ?
                        item : null);

                    let checkHavePointInside = Object.keys(this.getPointsInside).find(item => item === countries[i].enName ?
                        item : null);

                    if (checkHavePointFrom) {
                        offer = Object.assign(offer,
                            {
                                loadingPointFrom: this.getPointsFrom[checkHavePointFrom],
                                loadingPointBy: this.getPointsTo[checkHavePointFrom],
                                insidePoint: this.getPointsInside[checkHavePointFrom],
                            }
                        )
                    }

                    if (checkHavePointTo) {
                        offer = Object.assign(offer,
                            {
                                loadingPointFrom: this.getPointsFrom[checkHavePointTo],
                                loadingPointBy: this.getPointsTo[checkHavePointTo],
                                insidePoint: this.getPointsInside[checkHavePointTo],
                            }
                        )
                    }

                    if (checkHavePointInside) {
                        offer = Object.assign(offer,
                            {
                                loadingPointFrom: this.getPointsFrom[checkHavePointInside],
                                loadingPointBy: this.getPointsTo[checkHavePointInside],
                                insidePoint: this.getPointsInside[checkHavePointInside],
                            }
                        )
                    }

                    if (checkHavePointFrom || checkHavePointTo || checkHavePointInside) {
                        this.setMarker({lat: countries[i].lat, lng: countries[i].lng});
                    }
                    resultCountries.push(offer)
                }
            },

            setMarker(Points) {
                this.$gmapApiPromiseLazy().then(() => {
                    new this.google.maps.Marker({
                        position: Points,
                        map: this.map
                    })
                });
            }
        },
        mounted() {
            this.getCountries();
            this.initMap();
        }
    }
</script>

<style scoped>
  #map {
    height: 650px;
  }
</style>
