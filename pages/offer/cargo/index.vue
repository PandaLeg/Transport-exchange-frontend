<template>
  <div>
    <v-container>
      <v-card>
        <v-toolbar
          tabs
          color="#F4F4F4"
          flat
        >
          <template v-slot:extension>
            <v-tabs
              v-model="tabs"
              fixed-tabs
            >
              <v-tab href="#one" class="grey--text">
                {{ $t('offer.titleAll') }}
              </v-tab>
              <v-tab href="#two" class="grey--text">
                {{ $t('offer.titleSent') }}
              </v-tab>
              <v-tab href="#three" class="grey--text">
                {{ $t('offer.titleActive') }}
              </v-tab>
              <v-tab href="#four" class="grey--text">
                {{ $t('offer.titleInProcessing') }}
              </v-tab>
              <v-tab href="#five" class="grey--text">
                {{ $t('offer.titleFinished') }}
              </v-tab>
              <v-tabs-slider color="indigo"></v-tabs-slider>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
    </v-container>
    <v-row v-if="tabs === 'one'">
      <v-col
        cols="12"
        lg="12"
      >
        <v-data-table
          :headers="headers"
          :items="offerCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('offer.subtitleAllOffers') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{ $t('offer.deleteConfirmation') }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.cancellation') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.ok') }}</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="redirectToUpdateCargo(item.id)"
            >
              mdi-pencil
            </v-icon>

            <v-icon
              small
              class="mr-2"
              @click="deleteCargo(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row v-if="tabs === 'two'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="sentCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('offer.subtitleSentOffers') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{ $t('offer.deleteConfirmation') }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.cancellation') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.ok') }}</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="tabs === 'three'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="activeCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('offer.subtitleActiveOffers') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{ $t('offer.deleteConfirmation') }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.cancellation') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.ok') }}</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <fa-icon
                    :icon="faPlus"
                    small
                  >
                  </fa-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  {{ $t('offer.confirmation') }}
                </v-card-title>

                <v-card-text>
                  <span>
                    {{ $t('offer.textAboutInProcessing') }}
                  </span>
                  <br>
                  <span>
                    {{ $t('offer.textAboutConfirmation') }}
                  </span>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    {{ $t('offer.cancel') }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="addToProcessing(item)"
                  >
                    {{ $t('offer.accept') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="tabs === 'four'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headersInProcessing"
          :items="inProcessingCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('offer.titleInProcessing') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              @click="redirectToCargoOffer(item)"
            >
              <fa-icon
                :icon="faArrowAltCircleRight"
                class="icons__btn"
              >
              </fa-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="tabs === 'five'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headersInProcessing"
          :items="completeCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('offer.titleFinished') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      Удалено успешно!

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
    import {parseCargoDate} from "../../../service/cargo/parseDate";
    import {faPlus, faEdit, faTrash, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "offer-cargo",
        async fetch({store}) {
            await store.commit('offer/clearOffers');

            let body = {
                user: store.getters['getUser'],
                store: store
            };

            await store.dispatch('offer/getAllOfferCargoAction', body);
            await store.dispatch('offer/getActiveAndSentOffersCargoAction', body)
        },
        data() {
            return {
                dialog: false,
                dialogDelete: false,
                headers: [],
                headersInProcessing: [],
                headersSentAndActive: [],
                offerCargo: [],
                sentCargo: [],
                activeCargo: [],
                inProcessingCargo: [],
                completeCargo: [],
                editedIndex: -1,
                tabs: null,
                tabsClub: null,
                multiLine: true,
                snackbar: false
            }
        },
        created() {
            this.filledHeaders();
            this.filledAllOfferCargo(this.allOfferCargo, this.getPointsCargo, this.offerCargo);
            this.filledAllOfferCargo(this.allSentCargo, this.getPointsAllSentCargo, this.sentCargo);
            this.filledAllOfferCargo(this.allActiveCargo, this.getPointsAllActiveCargo, this.activeCargo);
            this.filledAllOfferCargo(this.allCargoInProcessing, this.getPointsAllCargoInProcessing, this.inProcessingCargo);
            this.filledAllOfferCargo(this.allCargoComplete, this.getPointsAllCargoComplete, this.completeCargo);
        },
        computed: {
            faPlus() {
                return faPlus
            },

            faEdit() {
                return faEdit
            },

            faTrash() {
                return faTrash
            },

            faArrowAltCircleRight() {
                return faArrowAltCircleRight
            },

            getUser() {
                return this.$store.getters['getUser']
            },

            allOfferCargo() {
                return this.$store.getters['offer/getAllOfferCargo']
            },

            getPointsCargo() {
                return this.$store.getters['offer/getPointsAllCargo']
            },

            allSentCargo() {
                return this.$store.getters['offer/getAllSentCargo']
            },

            getPointsAllSentCargo() {
                return this.$store.getters['offer/getPointsAllSentCargo']
            },

            allActiveCargo() {
                return this.$store.getters['offer/getAllActiveCargo']
            },

            getPointsAllActiveCargo() {
                return this.$store.getters['offer/getPointsAllActiveCargo']
            },

            allCargoInProcessing() {
                return this.$store.getters['offer/getAllCargoInProcessing']
            },

            getPointsAllCargoInProcessing() {
                return this.$store.getters['offer/getPointsAllCargoInProcessing']
            },

            allCargoComplete() {
                return this.$store.getters['offer/getAllCargoComplete']
            },

            getPointsAllCargoComplete() {
                return this.$store.getters['offer/getPointsAllCargoComplete']
            },
        },
        methods: {
            filledHeaders() {
                this.headers = [
                    {
                        text: this.$t('offer.cargo'),
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: this.$t('offer.fromWhere'), value: 'loadingPointFrom'},
                    {text: this.$t('offer.whereTo'), value: 'loadingPointBy'},
                    {text: this.$t('offer.date'), value: 'date'},
                    {text: this.$t('offer.transport'), value: 'bodyType'},
                    {text: this.$t('offer.payment'), value: 'payment'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ];

                this.headersInProcessing = [
                    {
                        text: this.$t('offer.cargo'),
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: this.$t('offer.fromWhere'), value: 'loadingPointFrom'},
                    {text: this.$t('offer.whereTo'), value: 'loadingPointBy'},
                    {text: this.$t('offer.date'), value: 'date'},
                    {text: this.$t('offer.transport'), value: 'bodyType'},
                    {text: this.$t('offer.payment'), value: 'payment'},
                    {text: this.$t('offer.status'), value: 'status'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ]
            },

            filledAllOfferCargo(allCargo, allPoints, resultCargo) {
                let paymentForm = '';
                let paymentTime = '';
                let data = '';

                let cargo = {
                    name: '',
                    loadingDateFrom: '',
                    loadingDateBy: '',
                    data: '',
                    bodyType: '',
                    payment: ''
                };

                for (let i = 0; i < allCargo.length; i++) {
                    paymentForm = this.localizeProperties(allCargo[i].propertiesCargo, 'paymentForm');
                    paymentTime = this.localizeProperties(allCargo[i].propertiesCargo, 'paymentTime');

                    data = parseCargoDate.parseDate(allCargo[i].loadingDateFrom,
                        allCargo[i].loadingDateBy, this.$i18n.localeProperties.code);

                    cargo = Object.assign({},
                        {id: allCargo[i].id},
                        {name: this.localizeName(allCargo[i].typesCargo)},
                        {loadingPointBy: allPoints[i].cityTo + ', ' + allPoints[i].countryTo},
                        {loadingPointFrom: allPoints[i].cityFrom + ', ' + allPoints[i].countryFrom},
                        {
                            date: this.$t('view.from') + ' ' + data.loadingDateFrom + ' ' + this.$t('view.by')
                                + ' ' + data.loadingDateBy
                        },
                        {bodyType: this.localizeBodyType(allCargo[i].typesCargo)},
                        {status: allCargo[i].status},
                    );

                    if (paymentForm && !paymentTime) {
                        Object.assign(cargo, {payment: paymentForm})
                    } else if (!paymentForm && paymentTime) {
                        Object.assign(cargo, {payment: paymentTime})
                    } else {
                        Object.assign(cargo, {payment: paymentForm + ', ' + paymentTime})
                    }

                    resultCargo.push(cargo)
                }
            },

            localizeProperties(propertiesCargo, property) {
                let name = propertiesCargo.find(i => i.property === property);

                if (name !== null && name !== undefined) {
                    if (this.$i18n.localeProperties.code === 'en') {
                        return name.enName;
                    } else if (this.$i18n.localeProperties.code === 'ua') {
                        return name.uaName;
                    } else {
                        return name.ruName;
                    }
                }
            },

            localizeName(typesCargo) {
                let name;

                name = typesCargo.find(i => {
                    if (i.type === 'nameCargo') {
                        return i;
                    }
                });

                if (this.$i18n.localeProperties.code === 'en') {
                    return name.enName;
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return name.uaName;
                } else {
                    return name.ruName;
                }
            },

            localizeBodyType(typesCargo) {
                let name;

                name = typesCargo.find(i => {
                    if (i.type === 'bodyType') {
                        return i;
                    }
                    if (i.type === 'vesselType') {
                        return i;
                    }
                    if (i.type === 'carType') {
                        return i;
                    }
                });


                if (this.$i18n.localeProperties.code === 'en') {
                    return name.enName;
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return name.uaName;
                } else {
                    return name.ruName;
                }
            },

            async addToProcessing(cargo) {
                let body = {
                    cargo: cargo,
                    checkChangeStatus: true,
                    store: this.$store
                };

                let itemIndex = this.activeCargo.indexOf(cargo);
                this.activeCargo.splice(itemIndex, 1);

                itemIndex = this.offerCargo.indexOf(cargo);
                this.offerCargo.splice(itemIndex, 1);

                await this.$store.dispatch('offer/changeStatusCargoAction', body);

                this.inProcessingCargo = this.allCargoInProcessing;
            },

            redirectToCargoOffer(cargo) {
                this.$router.push(this.localePath('/offer/cargo/' + cargo.id))
            },

            redirectToUpdateCargo(id) {
                this.$router.push('/offer/cargo/editing/' + id)
            },

            async deleteCargo(id) {
                const body = {
                    id: id,
                    store: this.$store
                };
                console.log(id);
                await this.$store.dispatch('admin/deleteCargoAction', body).then(() => {
                    let number = this.offerCargo.findIndex(i => i.id === id);
                    this.offerCargo.splice(number, 1);
                    this.snackbar = true;
                    this.dialogDelete = false;
                })
            }
        }
    }
</script>

<style scoped>
  .icons__btn {
    color: deepskyblue;
    font-size: 18px;
  }

</style>
