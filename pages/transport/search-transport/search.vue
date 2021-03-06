<template>
  <v-container>
    <v-row justify="start">
      <v-col
        cols="12"
        lg="8"
        md="8"
        v-for="transport in listTransportsAfterSearch"
        :key="transport.id"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="ml-lg-10"
            :elevation="hover ? 4 : 2"
            :class="{ 'on-hover': hover }"
            @click="redirectTransportViewPage(transport.id)"
          >
            <v-card-title class="title-font primary--text">{{ getLocalizeBodyType(transport) }}</v-card-title>
            <v-card-text class="text--primary">
              <v-row>
                <v-col
                  cols="12"
                  sm="2"
                  md="2"
                  lg="2"
                >
                  <span>{{ $t('searchTransport.fromWhere') }}:</span>
                </v-col>
                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <template v-for="point in getPointsTransports">
                  <span
                    v-if="(transport.id === point.transport.id || transport.id === point.transport) &&
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
                  <span>{{ $t('searchTransport.whereTo') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <template v-for="point in getPointsTransports">
                  <span
                    v-if="(transport.id === point.transport.id || transport.id === point.transport) &&
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
                  <span>{{ $t('searchTransport.date') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="10"
                  md="10"
                  lg="10"
                >
                  <span class="date-font">{{ $t('view.from') }} {{ parseDate(transport).loadingDateFrom }}
                    {{ $t('view.by') }} {{ parseDate(transport).loadingDateBy }}
                  </span>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-subtitle>{{ dateAddedTransport(transport) }}</v-card-subtitle>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <template v-if="listTransportsAfterSearch.length !== 0">
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
    import {parseCargoDate} from '../../../service/cargo/parseDate'

    export default {
        name: "search",
        async fetch({store, query}) {
            if (store.getters['transport/getTransportsAfterSearch'].length === 0) {
                let data = {
                    countryFrom: query.countryFrom, countryTo: query.countryTo, cityFrom: query.cityFrom,
                    cityTo: query.cityTo, loadingDateFrom: query.loadingDateFrom, loadingDateBy: query.loadingDateBy,
                    carryingCapacityFrom: query.carryingCapacityFrom, carryingCapacityUpTo: query.carryingCapacityUpTo,
                    volumeFrom: query.volumeFrom, volumeUpTo: query.volumeUpTo, bodyType: query.bodyType,
                    paymentForm: query.paymentForm, paymentTime: query.paymentTime
                };

                let body = {
                    data, store,
                    page: query.page - 1,
                    pageSize: query.pageSize === undefined ? 3 : query.pageSize
                };

                store.commit('transport/setDataForSearchTransport', {data, page: query.page});

                store.commit('transport/setPageSize', query.pageSize);

                store.commit('transport/setCookieResultSearch', {
                    data, page: query.page, pageSize:
                        query.pageSize ? query.pageSize : 3
                });
                store.commit('transport/setResultDataSearch');

                store.commit('transport/clearTransportsAfterSearch');

                await store.dispatch('transport/searchTransportAction', body);
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
                console.log("PAGE SIZE CREATED", this.getPageSize);
                this.pageSize = Number(this.getPageSize);
            } else {
                this.pageSize = 3;
            }
        },
        computed: {
            listTransportsAfterSearch() {
                console.log(this.$store.getters['transport/getTransportsAfterSearch']);
                return this.$store.getters['transport/getTransportsAfterSearch']
            },

            getCurrentPage() {
                return this.$store.getters['transport/getCurrentPage'] + 1;
            },

            getTotalPages() {
                return this.$store.getters['transport/getTotalPages']
            },

            getPageSize() {
                return this.$store.getters['transport/getPageSize']
            },

            getDataForSearchTransport() {
                return this.$store.getters['transport/getDataForSearchTransport']
            },

            getPointsTransports() {
                return this.$store.getters['transport/getPointsTransports']
            }
        },
        methods: {
            getLocalizeBodyType(transport){
                let bodyType = transport.typesTransport.find(i => i.type === 'bodyType');

                if (this.$i18n.localeProperties.code === 'en') {
                    return bodyType.enName;
                } else if (this.$i18n.localeProperties.code === 'ua') {
                    return bodyType.uaName;
                } else {
                    return bodyType.ruName;
                }
            },

            parseDate(transport) {
                let loadingDateFrom = transport.loadingDateFrom;
                let loadingDateBy = transport.loadingDateBy;

                return parseCargoDate.parseDate(loadingDateFrom, loadingDateBy, this.$i18n.localeProperties.code);
            },

            dateAddedTransport(transport){
                let dateAdded = transport.dateAdded;

                return parseCargoDate.parseDate(dateAdded, null, this.$i18n.localeProperties.code);
            },

            redirectTransportViewPage(id) {
                this.$router.push((this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
                    '/transport/view/' + id);
            },

            async nextPage() {
                this.$store.commit('transport/clearTransportsAfterSearch');

                const transport = Object.assign({}, {page: this.page}, {pageSize: this.pageSize},
                    {...this.getDataForSearchTransport});
                let body = {
                    data: this.getDataForSearchTransport, store: this.$store, page: this.page - 1,
                    pageSize: this.pageSize
                };

                // Set data result search
                this.$store.commit('transport/setCookieResultSearch', {
                    data: {...this.getDataForSearchCargo},
                    page: this.page, pageSize: this.pageSize
                });

                this.$store.commit('cargo/setPageSize', this.pageSize);
                this.$store.commit('transport/setResultDataSearch');

                await this.$store.dispatch('transport/searchTransportAction', body);

                await this.$router.push({path: (this.$i18n.localeProperties.code !== 'ru' ? '/' +
                        this.$i18n.localeProperties.code : '') + '/transport/search-transport/search', query: transport})
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

</style>
