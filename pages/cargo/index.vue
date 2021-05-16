<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8">
        <v-card
          color="red lighten-2"
          dark
        >
          <v-card-title class="headline red lighten-3">
            Search for Public APIs
          </v-card-title>
          <v-card-text>
            Explore hundreds of free API's ready for consumption! For more information visit
            <a
              class="grey--text text--lighten-3"
              href="https://github.com/toddmotto/public-apis"
              target="_blank"
            >the Github repository</a>.
          </v-card-text>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
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
          :label="$t('addCargo.selectPlaceLoading')"
          :placeholder="$t('addCargo.search')"
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
</template>

<script>
    import authHeader from '../../service/auth-header'

    export default {
        async asyncData({store, $axios}) {
            const response = await $axios.get('http://localhost:9090/cargo/' + 'get-cargo', {headers: authHeader(store)});
            const data = await response.data;
            console.log("CARGOOOO", data);
            return {data};
        },
        data(){
            return{
                firstLoadingPoint: null,
                searchFirstLoadingPoint: null,
                isLoadingFirstPointFrom: false,
                entriesFirstLoadingPoint: []
            }
        },
        watch:{
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
                            console.log(res);
                            this.entriesFirstLoadingPoint = res.records;
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        .finally(() => (this.isLoadingFirstPointFrom = false))
                }
            }
        }
    }
</script>
