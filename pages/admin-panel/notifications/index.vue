<template>
  <v-container>
    <v-row justify="start">
      <v-col
        cols="12"
        lg="6"
        md="6"
        v-for="confirmation in getConfirmationNotifications"
        :key="confirmation.id"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="ml-lg-10"
            :elevation="hover ? 4 : 2"
            :class="{ 'on-hover': hover }"
            @click="redirectNotificationViewPage(confirmation.id)"
          >
            <v-card-title class="title-font primary--text">{{ $t('adminPanel.titleIdentificationCompany') }}</v-card-title>
            <v-card-text class="text--primary">
              <v-row>
                <v-col
                  cols="12"
                  sm="3"
                  md="3"
                  lg="3"
                >
                  <span>{{ $t('settings.fullName') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="9"
                  md="9"
                  lg="9"
                >
                  <span class="subtitle-font">
                    {{ confirmation.user.firstName }}
                    {{ confirmation.user.lastName }}
                    {{ confirmation.user.patronymic }}
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  sm="3"
                  md="3"
                  lg="3"
                >
                  <span>{{ $t('adminPanel.name') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="9"
                  md="9"
                  lg="9"
                >
                  <span class="subtitle-font">
                    {{ confirmation.user.companyName }}
                  </span>
                </v-col>

                <v-col
                  cols="12"
                  sm="3"
                  md="3"
                  lg="3"
                >
                  <span>{{ $t('adminPanel.code') }}:</span>
                </v-col>

                <v-col
                  cols="12"
                  sm="9"
                  md="9"
                  lg="9"
                >
                  <span class="subtitle-font">
                    {{ confirmation.user.companyCode }}
                  </span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <template v-if="getConfirmationNotifications.length !== 0">
      <v-row justify="start">
        <v-col
          lg="2"
        >
          <v-select
            v-model="pageSize"
            :items="quantityItems"
            label="Уведомления (10)"
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
    export default {
        name: "admin-panel-notifications",
        layout: 'admin-bar',
        data() {
            return {
                page: 1,
                quantityItems: [2, 10, 20, 40, 50],
                pageSize: 2
            }
        },
        created() {
            this.getNotifications();
        },
        computed: {
            getConfirmationNotifications() {
                return this.$store.getters['admin/getConfirmationNotifications'];
            },

            getCurrentPage() {
                return this.$store.getters['admin/getCurrentPage'] + 1;
            },

            getTotalPages() {
                return this.$store.getters['admin/getTotalPages']
            },

            getPageSize() {
                return this.$store.getters['admin/getPageSize']
            }
        },
        methods: {
            async getNotifications() {
                let body = {
                    store: this.$store,
                    page: this.$route.query.page ? this.$route.query.page - 1 : 0,
                    pageSize: this.$route.query.pageSize !== undefined ? this.$route.query.pageSize : 2
                };

                this.$store.commit('admin/setCookiePageNotifications', {
                    page: this.$route.query.page ? this.$route.query.page : 1,
                    pageSize: this.$route.query.pageSize ? this.$route.query.pageSize : 2
                });

                this.$store.commit('admin/setPathToSearch');

                this.$store.commit('admin/clearConfirmationNotifications');

                await this.$store.dispatch('admin/getConfirmationNotificationsAction', body)
                    .then(() => {
                        this.page = Number(this.getCurrentPage);

                        if (this.getPageSize !== undefined) {
                            this.pageSize = Number(this.getPageSize);
                        } else {
                            this.pageSize = 2;
                        }
                    })
            },

            redirectNotificationViewPage(id) {
                this.$router.push((this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
                    '/admin-panel/notifications/' + id);
            },

            async nextPage() {
                this.$store.commit('admin/clearConfirmationNotifications');

                const notification = Object.assign({}, {page: this.page}, {pageSize: this.pageSize});
                let body = {
                    store: this.$store, page: this.page - 1, pageSize: this.pageSize
                };

                console.log(this.page);
                this.$store.commit('admin/setCookiePageNotifications', {
                    page: this.page, pageSize: this.pageSize
                });

                this.$store.commit('admin/setPathToSearch');

                this.$store.commit('admin/setPageSize', this.pageSize);

                await this.$store.dispatch('admin/getConfirmationNotificationsAction', body);

                await this.$router.push({
                    path: (this.$i18n.localeProperties.code !== 'ru' ? '/' +
                        this.$i18n.localeProperties.code : '') + '/admin-panel/notifications', query: notification
                })
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
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto+Slab&family=Spectral&family=Vollkorn:wght@600&display=swap');

  .title-font {
    font-family: 'Merriweather', serif;
    font-weight: bold;
    font-size: 20px;
  }

  .subtitle-font {
    font-family: 'Vollkorn', serif;
    font-weight: bold;
    font-size: 18px;
  }

</style>
