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
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="offersTransports"
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

    <v-row v-if="tabs === 'two'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="sentTransports"
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
    <v-row v-if="tabs === 'three'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headers"
          :items="activeTransports"
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
            <v-btn
              icon
              @click=""
            >
              <fa-icon
                :icon="faEdit"
                small
              >
              </fa-icon>
            </v-btn>

            <v-btn
              icon
              @click=""
            >
              <fa-icon
                :icon="faTrash"
                small
              >
              </fa-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="tabs === 'four'">
      <v-col cols="12" lg="12">
        <v-data-table
          :headers="headersInProcessing"
          :items="inProcessingTransports"
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
              @click="redirectToTransportOffer(item)"
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
          :items="completeTransports"
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
          <template v-slot:item.actions="{ item }">

          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import {parseCargoDate} from "../../../service/cargo/parseDate";
    import {faPlus, faEdit, faTrash, faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "offer-transport",
        async fetch({store}) {
            await store.commit('offer/clearOffersTransports');

            let body = {
                user: store.getters['getUser'],
                store: store
            };

            await store.dispatch('offer/getAllOfferTransportAction', body);
            await store.dispatch('offer/getActiveAndSentOffersTransportsAction', body)
        },
        data() {
            return {
                dialog: false,
                dialogDelete: false,
                headers: [],
                headersInProcessing: [],
                offersTransports: [],
                sentTransports: [],
                activeTransports: [],
                inProcessingTransports: [],
                completeTransports: [],
                editedIndex: -1,
                tabs: null,
                tabsClub: null
            }
        },
        created() {
            this.filledHeaders();
            this.filledAllOfferOfTransports(this.allOfferTransports, this.getPointsTransports,
                this.offersTransports);
            this.filledAllOfferOfTransports(this.allSentTransports, this.getPointsAllSentTransports,
                this.sentTransports);
            this.filledAllOfferOfTransports(this.allActiveTransports, this.getPointsAllActiveTransports,
                this.activeTransports);
            this.filledAllOfferOfTransports(this.allTransportsInProcessing, this.getPointsAllTransportsInProcessing,
                this.inProcessingTransports);
            this.filledAllOfferOfTransports(this.allTransportsComplete, this.getPointsAllTransportsComplete,
                this.completeTransports);
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

            allOfferTransports() {
                return this.$store.getters['offer/getAllOfferTransports']
            },

            getPointsTransports() {
                return this.$store.getters['offer/getPointsTransports']
            },

            allSentTransports() {
                return this.$store.getters['offer/getAllSentTransports']
            },

            getPointsAllSentTransports() {
                return this.$store.getters['offer/getPointsAllSentTransports']
            },

            allActiveTransports() {
                return this.$store.getters['offer/getAllActiveTransports']
            },

            getPointsAllActiveTransports() {
                return this.$store.getters['offer/getPointsAllActiveTransports']
            },

            allTransportsInProcessing() {
                return this.$store.getters['offer/getTransportsInProcessing']
            },

            getPointsAllTransportsInProcessing() {
                return this.$store.getters['offer/getPointsAllTransportsInProcessing']
            },

            allTransportsComplete() {
                return this.$store.getters['offer/getTransportsComplete']
            },

            getPointsAllTransportsComplete() {
                return this.$store.getters['offer/getPointsAllTransportsComplete']
            },
        },
        methods: {
            filledHeaders() {
                this.headers = [
                    {
                        text: this.$t('offer.transport'),
                        align: 'start',
                        sortable: false,
                        value: 'bodyType',
                    },
                    {text: this.$t('offer.fromWhere'), value: 'loadingPointFrom'},
                    {text: this.$t('offer.whereTo'), value: 'loadingPointBy'},
                    {text: this.$t('offer.date'), value: 'date'},
                    {text: this.$t('offer.payment'), value: 'payment'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ];

                this.headersInProcessing = [
                    {
                        text: this.$t('offer.transport'),
                        align: 'start',
                        sortable: false,
                        value: 'bodyType',
                    },
                    {text: this.$t('offer.fromWhere'), value: 'loadingPointFrom'},
                    {text: this.$t('offer.whereTo'), value: 'loadingPointBy'},
                    {text: this.$t('offer.date'), value: 'date'},
                    {text: this.$t('offer.payment'), value: 'payment'},
                    {text: this.$t('offer.status'), value: 'status'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ]
            },

            filledAllOfferOfTransports(allTransports, allPoints, resultTransports) {
                let paymentForm = '';
                let paymentTime = '';
                let data = '';

                let transport = {
                    loadingDateFrom: '',
                    loadingDateBy: '',
                    data: '',
                    bodyType: '',
                    payment: ''
                };

                for (let i = 0; i < allTransports.length; i++) {
                    allTransports[i].propertiesTransport.map(item => {
                        if (item.property === 'paymentForm') {
                            paymentForm = item.ruName
                        }
                    });

                    allTransports[i].propertiesTransport.map(item => {
                        if (item.property === 'paymentTime') {
                            paymentTime = item.ruName
                        }
                    });

                    data = parseCargoDate.parseDate(allTransports[i].loadingDateFrom,
                        allTransports[i].loadingDateBy, this.$i18n.localeProperties.code);

                    transport = Object.assign({},
                        {id: allTransports[i].id},
                        {bodyType: allTransports[i].bodyType},
                        {loadingPointBy: allPoints[i].cityTo + ', ' + allPoints[i].countryTo},
                        {loadingPointFrom: allPoints[i].cityFrom + ', ' + allPoints[i].countryFrom},
                        {
                            date: this.$t('view.from') + ' ' + data.loadingDateFrom + ' ' + this.$t('view.by')
                                + ' ' + data.loadingDateBy
                        },
                        {status: allTransports[i].status}
                    );

                    if (paymentForm && !paymentTime) {
                        Object.assign(transport, {payment: paymentForm})
                    } else if (!paymentForm && paymentTime) {
                        Object.assign(transport, {payment: paymentTime})
                    } else {
                        Object.assign(transport, {payment: paymentForm + ', ' + paymentTime})
                    }

                    resultTransports.push(transport)
                }
            },

            async addToProcessing(transport) {
                console.log(transport);
                let body = {
                    transport: transport,
                    checkChangeStatus: true,
                    store: this.$store
                };

                let itemIndex = this.activeTransports.indexOf(transport);
                this.activeTransports.splice(itemIndex, 1);

                await this.$store.dispatch('offer/changeStatusTransportAction', body);

                this.inProcessingTransports = this.allTransportsInProcessing;
            },

            redirectToTransportOffer(transport) {
                this.$router.push(this.localePath('/offer/transport/' + transport.id))
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
