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
      <template>
        <v-btn
          @click="redirectMain"
          class="mr-5"
          text
        >
          {{ $t('navBarPanel.main') }}
        </v-btn>
      </template>

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
            {{ $t('navBarPanel.cargo') }}
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            :to="localePath('/cargo/add-cargo/vehicles/')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.addCargo') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="localePath('/cargo/search-cargo')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.searchCargo') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="localePath('/cargo/statistics')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faChartLine" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.statistics') }}</v-list-item-subtitle>
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
            {{ $t('navBarPanel.transport') }}
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            :to="localePath('/transport/add-transport')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.addTransport') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="localePath('/transport/search-transport')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.searchTransport') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="localePath('/transport/statistics')"
            link>
            <v-list-item-icon>
              <fa-icon :icon="faChartLine" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.statistics') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Offer -->
      <template
        v-if="getUser !== null"
      >
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
              {{ $t('navBarPanel.offers') }}
            </v-btn>
          </template>

          <v-list
            min-width="250"
          >
            <v-list-item
              :to="localePath('/offer/cargo')"
              link
            >
              <v-list-item-icon>
                <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>{{ $t('navBarPanel.offersCargo') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :to="localePath('/offer/transport')"
              link
            >
              <v-list-item-icon>
                <fa-icon :icon="faSearch" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle>{{ $t('navBarPanel.offersTransport') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Chat -->
        <v-btn
          :to="localePath('/chat')"
          class="mr-5"
          text
        >
          {{ $t('navBarPanel.chat') }}
        </v-btn>
      </template>

      <!-- Additional -->
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
            {{ $t('navBarPanel.additional') }}
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <v-list-item
            :to="localePath('/additional/distance-calculation')"
            link
          >
            <v-list-item-icon>
              <fa-icon :icon="faPlus" class="ml-1" :style="{ color: 'gray' }"></fa-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.distanceCalculation') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>


      <v-spacer></v-spacer>

      <!-- LOCALE -->
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
            <v-icon>language</v-icon>
          </v-btn>
        </template>

        <v-list
          min-width="250"
        >
          <!-- Languages -->
          <v-list-item
            :to="switchLocalePath('ru')"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>
                Русский
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="switchLocalePath('en')"
            link
          >
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>
                English
              </span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="switchLocalePath('ua')"
            link
          >
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>Українська</span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

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
          v-if="getUser != null && hasToken"
          min-width="250"
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
            :to="localePath('/profile')"
            link
          >
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.profile') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="localePath('/profile/settings')"
            link
          >
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.settings') }}</v-list-item-subtitle>
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
              <v-list-item-subtitle>{{ $t('navBarPanel.logout') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list
          v-else
          min-width="250"
        >
          <!-- USER -->
          <v-list-item
            :to="localePath('/authentication')"
            link
          >
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ $t('navBarPanel.authorization') }}</v-list-item-subtitle>
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
                title: 'CARGO&TRANSPORT'
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
                this.$router.push(this.localePath({name: 'index'}));
            },

            redirectAbout() {
                this.$router.push('/about')
            },

            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/authentication')
            }
        }
    }
</script>
