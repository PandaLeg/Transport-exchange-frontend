<template>
  <v-container>
    <v-row justify="start">
      <v-col
        cols="12"
        lg="8"
        md="8"
        v-for="cargo in listCargo"
        :key="cargo.id"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="ml-lg-10"
            :elevation="hover ? 4 : 2"
            :class="{ 'on-hover': hover }"
            @click="redirectCargoViewPage(cargo.id)"
          >
            <v-card-title class="title-font primary--text">{{ cargo.name }}</v-card-title>
            <v-card-text class="text--primary">
              <v-row>
                <v-col
                  cols="12"
                  sm="2"
                  md="2"
                  lg="2"
                >
                  <span>{{ $t('searchCargo.fromWhere') }}:</span>
                </v-col>
                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <template v-for="point in getPointsAllCargo">
                  <span
                    v-if="(cargo.id === point.cargo.id || cargo.id === point.cargo) &&
                    point.cityFrom !== null && point.countryFrom !== null"
                    class="subtitle-font"
                  >
                    {{ point.cityFrom }}, {{ point.countryFrom }} <br>
                  </span>
                  </template>
                </v-col>

                <v-col
                  cols="12"
                  sm="2"
                  md="2"
                  lg="2"
                >
                  <span>{{ $t('searchCargo.whereTo') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <template v-for="point in getPointsAllCargo">
                  <span
                    v-if="(cargo.id === point.cargo.id || cargo.id === point.cargo) &&
                    (point.cityTo !== null && point.countryTo !== null)"
                    class="subtitle-font">
                    {{ point.cityTo }}, {{ point.countryTo }} <br>
                  </span>
                  </template>
                </v-col>

                <v-col
                  cols="12"
                  sm="2"
                  md="2"
                  lg="2"
                >
                  <span>{{ $t('searchCargo.date') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <span class="date-font">{{ cargo.loadingDateFrom }} : {{ cargo.loadingDateBy }} </span>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-subtitle>3ч назад</v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <template v-if="listCargo.length !== 0">
      <v-row justify="start">
        <v-col
          lg="2"
        >
          <v-select
            v-model="pageSize"
            :items="quantityItems"
            label="Грузы (10)"
            class="ml-lg-10"
            solo
            @change="pageSizeChange"
          ></v-select>
        </v-col>
        <v-col
          lg="5"
        >
          <v-pagination
            v-model="page"
            :length="getTotalPages"
            :total-visible="4"
            circle
            @input="pageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
    export default {
        name: "cargo-search-cargo-id",
        async fetch({store, query}) {
            if (store.getters['cargo/listCargoAfterSearch'].length === 0) {
                let data = {
                    countryFrom: query.countryFrom, countryTo: query.countryTo, cityFrom: query.cityFrom,
                    cityTo: query.cityTo, loadingDateFrom: query.loadingDateFrom, loadingDateBy: query.loadingDateBy,
                    weightFrom: query.weightFrom, weightUpTo: query.weightUpTo, volumeFrom: query.volumeFrom,
                    volumeUpTo: query.volumeUpTo, nameCargo: query.nameCargo, bodyType: query.bodyType,
                    paymentForm: query.paymentForm, paymentTime: query.paymentTime
                };

                let body = {
                    data, store,
                    page: query.page - 1,
                    pageSize: query.pageSize === undefined ? 3 : query.pageSize
                };

                console.log("PAGE SIZE FETCH", query.pageSize);
                store.commit('cargo/setDataForSearchCargo', {data, page: query.page});

                store.commit('cargo/setPageSize', query.pageSize);

                store.commit('cargo/setCookieResultSearch', {data, page: query.page, pageSize:
                        query.pageSize ? query.pageSize : 3});
                store.commit('cargo/setResultDataSearch');

                store.commit('cargo/clearCargoAfterSearch');

                await store.dispatch('cargo/searchCargoAction', body);
            }
        },
        data() {
            return {
                page: 1,
                quantityItems: [3, 10, 20, 40, 50],
                pageSize: 3
            }
        },
        created() {
            this.page = Number(this.getCurrentPage);
            if (this.getPageSize !== undefined) {
                this.pageSize = Number(this.getPageSize);
            } else {
                this.pageSize = 3;
            }
        },
        computed: {
            listCargo() {
                console.log(this.$store.getters['cargo/listCargoAfterSearch']);
                return this.$store.getters['cargo/listCargoAfterSearch']
            },

            getCurrentPage() {
                return this.$store.getters['cargo/getCurrentPage'] + 1;
            },

            getTotalPages() {
                return this.$store.getters['cargo/getTotalPages']
            },

            getPageSize() {
                return this.$store.getters['cargo/getPageSize']
            },

            getDataForSearchCargo() {
                return this.$store.getters['cargo/getDataForSearchCargo']
            },

            getPointsAllCargo() {
                return this.$store.getters['cargo/getPointsAllCargo']
            }
        },
        methods: {
            redirectCargoViewPage(id) {
                this.$router.push((this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
                    '/cargo/view/' + id);
            },

            async nextPage() {
                this.$store.commit('cargo/clearCargoAfterSearch');

                const cargo = Object.assign({}, {page: this.page}, {pageSize: this.pageSize},
                    {...this.getDataForSearchCargo});
                let body = {
                    data: this.getDataForSearchCargo, store: this.$store, page: this.page - 1,
                    pageSize: this.pageSize
                };

                // Set data result search
                this.$store.commit('cargo/setCookieResultSearch', {
                    data: {...this.getDataForSearchCargo},
                    page: this.page, pageSize: this.pageSize
                });

                this.$store.commit('cargo/setPageSize', this.pageSize);
                this.$store.commit('cargo/setResultDataSearch');

                await this.$store.dispatch('cargo/searchCargoAction', body);

                await this.$router.push({path: (this.$i18n.localeProperties.code !== 'ru' ? '/' +
                        this.$i18n.localeProperties.code : '') + '/cargo/search-cargo/search', query: cargo})
            },

            pageChange(value) {
                this.page = value;
                this.nextPage();
            },

            pageSizeChange(value) {
                this.page = 1;
                this.pageSize = value;
                this.nextPage();
            }
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .v-card {
    transition: opacity .2s ease-in-out;
  }

  .title-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 24px;
  }

  .subtitle-font {
    font-family: 'Vollkorn', serif;
    font-weight: bold;
    font-size: 18px;
  }

  .date-font {
    font-family: 'Spectral', serif;
    font-weight: normal;
    font-size: 18px;
  }
</style>
