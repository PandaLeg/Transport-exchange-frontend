<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card>
          <v-img
            class="subheading white--text"
            :src="backgroundImage"
            aspect-ratio="2.5"
          >
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import mainPhoto from '../assets/main_photo.jpg'

    export default {
        data() {
            return {
                pageTitle: 'Main Page',
                backgroundImage: mainPhoto
            }
        }
    }
</script>


<style scoped>
</style>
