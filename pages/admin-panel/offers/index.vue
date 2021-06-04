<template>
  <v-container
    class="mt-5"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="12"
      >
        <v-data-table
          :headers="headersCargo"
          :items="cargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('adminPanel.titleAllCargo') }}</v-toolbar-title>
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
              @click="editingCargo(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click=""
            >
              mdi-delete
            </v-icon>
            <v-icon
              small
              class="ml-2"
              @click=""
            >
              mdi-account
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row
      class="mt-12"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="12"
      >
        <v-data-table
          :headers="headersTransports"
          :items="transports"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('adminPanel.titleAllTransport') }}</v-toolbar-title>
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
              @click="editingTransport(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click=""
            >
              mdi-delete
            </v-icon>
            <v-icon
              small
              class="ml-2"
              @click=""
            >
              mdi-account
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import {parseCargoDate} from "../../../service/cargo/parseDate";

    export default {
        name: "offers",
        layout: 'admin-bar',
        components: {},
        async fetch({store}) {
            await store.dispatch('admin/getCargoAndTransport');
        },
        data() {
            return {
                headers: [],
                headersCargo: [],
                headersTransports: [],
                cargo: [],
                transports: [],
                dialog: false,
                dialogDelete: false
            }
        },
        created() {
            this.filledHeaders();
            this.filledAllOfferCargo(this.getCargo, this.getPointsCargo, this.cargo);
            this.filledAllOfferOfTransports(this.getTransports, this.getPointsTransports, this.transports);
        },
        computed: {
            getCargo() {
                return this.$store.getters['admin/getCargo']
            },

            getPointsCargo() {
                return this.$store.getters['admin/getPointsCargo']
            },

            getTransports() {
                return this.$store.getters['admin/getTransports']
            },

            getPointsTransports() {
                return this.$store.getters['admin/getPointsTransports']
            }
        },
        methods: {
            filledHeaders() {
                this.headersCargo = [
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
                ];

                this.headersTransports = [
                    {
                        text: this.$t('offer.transport'),
                        align: 'start',
                        sortable: false,
                        value: 'bodyType',
                    },
                    {text: this.$t('offer.fromWhere'), value: 'loadingPointFrom'},
                    {text: this.$t('offer.whereTo'), value: 'loadingPointBy'},
                    {text: this.$t('offer.date'), value: 'date'},
                    {text: this.$t('offer.transport'), value: 'bodyType'},
                    {text: this.$t('offer.payment'), value: 'payment'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ];
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
                    allCargo[i].propertiesCargo.map(item => {
                        if (item.property === 'paymentForm') {
                            paymentForm = item.ruName
                        }
                    });

                    allCargo[i].propertiesCargo.map(item => {
                        if (item.property === 'paymentTime') {
                            paymentTime = item.ruName
                        }
                    });

                    data = parseCargoDate.parseDate(allCargo[i].loadingDateFrom,
                        allCargo[i].loadingDateBy, this.$i18n.localeProperties.code);

                    cargo = Object.assign({},
                        {id: allCargo[i].id},
                        {name: allCargo[i].name},
                        {loadingPointBy: allPoints[i].cityTo + ', ' + allPoints[i].countryTo},
                        {loadingPointFrom: allPoints[i].cityFrom + ', ' + allPoints[i].countryFrom},
                        {
                            date: this.$t('view.from') + ' ' + data.loadingDateFrom + ' ' + this.$t('view.by')
                                + ' ' + data.loadingDateBy
                        },
                        {bodyType: allCargo[i].bodyType},
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

            editingCargo(id) {
                this.$router.push('/admin-panel/offers/cargo/' + id)
            },

            editingTransport(id) {
                this.$router.push('/admin-panel/offers/transport/' + id)
            }
        }
    }
</script>

<style scoped>

</style>
