<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-title v-text="title"/>

      <v-divider
        class="mx-7"
        vertical
      ></v-divider>

      <!-- MAIN -->
      <v-btn
        class="mr-5"
        text
        @click="redirectMain"
      >
        Main
      </v-btn>

      <!-- CARGO -->
      <v-menu
        open-on-hover
        offset-y
        rounded
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mr-5"
            text
          >
            Cargo
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            link
            @click="redirectAddCargo"
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Add cargo</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            @click="redirectSearchCargo"
          >
            <v-list-item-icon>
              <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Search cargo</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <fa-icon :icon="faChartLine" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Statistics</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Transport -->
      <v-menu
        open-on-hover
        offset-y
        rounded
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mr-5"
            text
          >
            Transport
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            link
            @click="redirectAddTransport"
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Add transport</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            @click="redirectSearchTransport"
          >
            <v-list-item-icon>
              <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Search transport</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-icon>
              <fa-icon :icon="faChartLine" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Statistics</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Offer -->
      <v-menu
        open-on-hover
        offset-y
        rounded
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mr-5"
            text
          >
            Offer
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            link
            @click="redirectCargoOffer"
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Cargo offer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            @click="redirectTransportOffer"
          >
            <v-list-item-icon>
              <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Transport offer</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Chat -->
      <v-btn
        class="mr-5"
        text
        @click="redirectChat"
      >
        Chat
      </v-btn>

      <v-spacer></v-spacer>

      <!-- Account -->
      <v-menu
        close-on-click
        close-on-content-click
        left
        offset-x
        origin="center center"
        transition="scale-transition"
        rounded
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="mr-5"
            icon
          >
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>

        <v-list
          min-width="250"
          v-if="hasToken"
        >
          <!-- USER -->
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="avatarInstitute"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-black">
                {{ getUser.email }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Info -->
          <v-list-item
            @click="redirectProfile"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Profile</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="redirectProfileSettings"
            link
          >
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Settings</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            @click="logout"
            link
          >
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Sign Out</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list
          min-width="250"
          v-else
        >
          <!-- USER -->
          <v-list-item
            @click="authentication"
            link
          >
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>Authorization</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <nuxt/>
    </v-main>

    <v-footer
      app
      class="text--center"
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
    import {faChartLine, faPlus, faSearch, faTruck} from '@fortawesome/free-solid-svg-icons'
    import profilePageAvatar from '../assets/AllisonProfilePage.jpg'

    export default {
        name: 'default',
        data() {
            return {
                avatarInstitute: profilePageAvatar,
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: 'mdi-apps',
                        title: 'Welcome',
                        to: '/'
                    },
                    {
                        icon: 'mdi-chart-bubble',
                        title: 'About',
                        to: '/about'
                    }
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'CARGO&SUPPLIERS'
            }
        },
        computed: {
            hasToken() {
                return this.$store.getters['hasToken'];
            },

            faTruck() {
                return faTruck
            },

            faPlus() {
                return faPlus
            },

            faSearch() {
                return faSearch
            },

            faChartLine() {
                return faChartLine
            },

            getUser() {
                return this.$store.getters['getUser']
            }
        },
        methods: {
            redirectMain() {
                this.$router.push('/')
            },

            redirectAbout() {
                this.$router.push('/about')
            },

            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/authentication')
            },

            authentication() {
                this.$router.push('/authentication')
            },

            redirectProfile() {
                this.$router.push('/profile')
            },

            redirectProfileSettings() {
                this.$router.push('/profile/settings')
            },

            redirectAddCargo() {
                this.$router.push('/cargo/add-cargo')
            },

            redirectAllCargo() {
                this.$router.push('/cargo')
            },

            redirectSearchCargo() {
                this.$router.push('/cargo/search-cargo')
            },

            redirectAddTransport() {
                this.$router.push('/transport/add-transport')
            },

            redirectSearchTransport() {
                this.$router.push("/transport/search-transport")
            },

            redirectCargoOffer() {
                this.$router.push("/offer/cargo")
            },

            redirectTransportOffer() {
                this.$router.push("/offer/transport")
            },

            redirectChat() {
                this.$router.push("/chat")
            }
        }
    }
</script>
