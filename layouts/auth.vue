<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <v-row>
        <v-col
          class="py-4 text-center"
          cols="12"
        >
          <div>
            <v-icon>
              copyright
            </v-icon>
            Copyright
            {{ new Date().getFullYear() - 1 }} - {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
    export default {
        data() {
            return {
                fixed: false
            }
        }
    }
</script>
