<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>

      <v-btn
        rounded
        color="error"
        @click="getUserContent"
      >
        User content
      </v-btn>
    </v-col>
    {{ userContent }}
  </v-row>
</template>

<script>
    export default {
        name: 'about',
        middleware: 'auth',
        async fetch({store}) {
            if (store.getters['test-content/userContent'] === '') {
                console.log("FETCH");
                await store.dispatch('test-content/userContentAction', store)
            }
        },
        computed: {
            userContent() {
                return this.$store.getters['test-content/userContent'];
            },
        },
        methods: {
            async getUserContent() {
                await this.$store.dispatch('test-content/userContentAction', this.$store)
            }
        }
    }
</script>
