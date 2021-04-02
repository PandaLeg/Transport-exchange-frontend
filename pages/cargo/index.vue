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
        data: () => ({})
    }
</script>
