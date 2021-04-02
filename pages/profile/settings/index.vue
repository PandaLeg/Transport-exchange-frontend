<template>
  <v-container v-if="getUser">
    <v-row justify="center">
      <v-col lg="8">
        <template
          v-if="checkUserRole"
        >
          <user-settings :getUser="getUser"></user-settings>
        </template>
        <template
          v-else
        >
          <legal-user-settings :getUser="getUser"></legal-user-settings>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import UserSettings from "../../../components/profile/settings/UserSettings";
    import LegalUserSettings from "../../../components/profile/settings/LegalUserSettings";

    export default {
        name: "index",
        components: {
            UserSettings,
            LegalUserSettings
        },
        computed: {
            getUser() {
                console.log("GET USER", this.$store.getters['getUser']);
                return this.$store.getters['getUser']
            },

            checkUserRole() {
                return this.getUser.roles.map(item => item.name).includes('ROLE_USER')
            }
        }
    }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@500;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600&family=Roboto:wght@400;500&family=Rubik:wght@400;500;600&family=Source+Sans+Pro:wght@400;600&display=swap');

  .title-information-font {
    font-family: 'Merriweather', sans-serif;
    font-weight: bold;
    font-size: 28px;
  }

  .list-title-information-font {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  .list-subtitle-information-font {
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 16px;
  }
</style>
