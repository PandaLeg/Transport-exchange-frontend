<template>
  <v-app dark>
    <v-app-bar
      id="app-bar"
      absolute
      app
      :color="'#1a73e8'"
      dark
      flat
      height="75"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

      <v-toolbar-title
        v-text="$t('navBarPanel.main')"
      />

      <v-spacer/>

      <v-btn
        class="ml-2"
        min-width="0"
        text
        @click="redirectToDashboard"
      >
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

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
            class="ml-2"
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

      <v-btn
        class="ml-2"
        min-width="0"
        text
        @click="redirectToProfile"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
        class="ml-2"
        min-width="0"
        text
        @click="logout"
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      id="core-navigation-drawer"
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      class="background-image"
      :expand-on-hover="expandOnHover"
      :src="barImage"
      app
      width="260"
    >
      <!--mobile-break-point="960"-->
      <v-list>
        <v-list-item
        >
          <v-list-item-avatar
            class="align-self-center"
            color="white"
            contain
          >
            <v-img
              class="list-title"
              src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
              max-height="30"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="list-title"
              v-text="'VLADYSLAV'"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="mx-2" style="color: white"/>

      <v-list
        flat
      >
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="localePath(item.to)"
          >
            <v-list-item-icon
              class="list-items"
            >
              <v-icon v-text="item.icon"/>
            </v-list-item-icon>

            <v-list-item-content
              class="list-items"
            >
              <v-list-item-title v-text="getCurrentTitle(item.id)"/>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
    export default {
        name: "admin-bar",
        props: {
            expandOnHover: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                drawer: true,
                items: [
                    {
                        id: 1,
                        icon: 'mdi-view-dashboard',
                        to: '/admin-panel',
                    },
                    {
                        id: 2,
                        icon: 'mdi-account',
                        to: '/admin-panel/profile',
                    },
                    {
                        id: 3,
                        icon: 'mdi-account-group',
                        to: '/admin-panel/users',
                    },
                    {
                        id: 4,
                        icon: 'mdi-clipboard-outline',
                        to: '/admin-panel/offers',
                    },
                    {
                        id: 5,
                        icon: 'mdi-chart-bubble',
                        to: '/admin-panel/notifications',
                    }
                ]
            }
        },
        computed: {
            barImage() {
                return this.$store.state.barImage
            },

            barColor() {
                return this.$store.state.barColor
            }
        },
        methods: {
            getCurrentTitle(id) {
                if (id === 1) {
                    return this.$t('adminPanel.dashboard');
                } else if (id === 2) {
                    return this.$t('adminPanel.profile');
                } else if (id === 3) {
                    return this.$t('adminPanel.users');
                } else if (id === 4) {
                    return this.$t('adminPanel.offers');
                } else {
                    return this.$t('adminPanel.notifications');
                }
            },

            redirectToDashboard() {
                this.$router.push(this.localePath('/admin-panel'))
            },

            redirectToProfile() {
                this.$router.push(this.localePath('/admin-panel/profile'))
            },

            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/authentication')
            }
        }
    }
</script>

<style scoped>
  .background-image {
    display: table;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) center top;
    height: 350px;
    color: white;
  }

  .background-image:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 2;
  }

  .list-title {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    color: #fff;
  }

  .list-items {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    z-index: 3;
    color: #fff;
  }
</style>
