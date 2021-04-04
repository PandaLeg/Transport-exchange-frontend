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
                Все
              </v-tab>
              <v-tab href="#two" class="grey--text">
                Активные
              </v-tab>
              <v-tab href="#two" class="grey--text">
                Завершённые
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
          :items="offerCargo"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Все заявки</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="">OK</v-btn>
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
      <v-col cols="12" lg="6">

      </v-col>
    </v-row>
  </div>
</template>

<script>
    import {parseCargoDate} from "../../service/cargo/parseDate";

    export default {
        name: "cargo",
        async fetch({store}) {
            if (Object.keys(store.getters['offer/getAllOfferCargo']).length === 0) {
                let body = {
                    user: store.getters['getUser'],
                    store: store
                };

                await store.dispatch('offer/getAllOfferCargoAction', body)
            }
        },
        data() {
            return {
                dialog: false,
                dialogDelete: false,
                headers: [
                    {
                        text: 'Груз',
                        align: 'start',
                        sortable: false,
                        value: 'name',
                    },
                    {text: 'Откуда', value: 'loadingDateFrom'},
                    {text: 'Куда', value: 'loadingDateBy'},
                    {text: 'Дата', value: 'data'},
                    {text: 'Транспорт', value: 'bodyType'},
                    {text: 'Оплата', value: 'payment'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ],
                offerCargo: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                tabs: null,
                tabsClub: null
            }
        },
        created() {
            this.filledAllOfferCargo();
        },
        computed: {
            allOfferCargo() {
                return this.$store.getters['offer/getAllOfferCargo']
            },

            getPointsCargo() {
                return this.$store.getters['offer/getPointsAllCargo']
            },
        },
        methods: {
            filledAllOfferCargo() {
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

                console.log(this.getPointsCargo);

                for (let i = 0; i < this.allOfferCargo.length; i++) {
                    this.allOfferCargo[i].propertiesCargo.map(item => {
                        if (item.property === 'paymentForm') {
                            paymentForm = item.ruName
                        }
                    });

                    this.allOfferCargo[i].propertiesCargo.map(item => {
                        if (item.property === 'paymentTime') {
                            paymentTime = item.ruName
                        }
                    });

                    data = parseCargoDate.parseDate(this.allOfferCargo[i].loadingDateFrom,
                        this.allOfferCargo[i].loadingDateBy);

                    cargo = Object.assign({},
                        {name: this.allOfferCargo[i].name},
                        {loadingDateBy: this.getPointsCargo[i].cityTo + ', ' + this.getPointsCargo[i].countryTo},
                        {loadingDateFrom: this.getPointsCargo[i].cityFrom + ', ' + this.getPointsCargo[i].countryFrom},
                        {data: 'с ' + data.loadingDateFrom + ' по ' + data.loadingDateBy},
                        {bodyType: this.allOfferCargo[i].bodyType}
                    );

                    if (paymentForm && !paymentTime) {
                        Object.assign(cargo, {payment: paymentForm})
                    } else if (!paymentForm && paymentTime) {
                        Object.assign(cargo, {payment: paymentTime})
                    } else {
                        Object.assign(cargo, {payment: paymentForm + ', ' + paymentTime})
                    }
                    this.offerCargo.push(cargo)
                }
            }
        }
    }
</script>

<style scoped>

</style>
