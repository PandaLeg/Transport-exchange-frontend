<template>
  <v-container
    class="mt-5"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="12"
      >
        <v-data-table
          :headers="headersIndividualUser"
          :items="getIndividualUsers"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('adminPanel.titleAllUsers') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{ $t('offer.deleteConfirmation') }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.cancellation') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.ok') }}</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editing(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click=""
            >
              mdi-delete
            </v-icon>
            <v-icon
              small
              class="ml-2"
              @click=""
            >
              mdi-account
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row
      class="mt-12"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        lg="12"
      >
        <v-data-table
          :headers="headersLegalUser"
          :items="getLegalUsers"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>{{ $t('adminPanel.titleAllUsers') }}</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline">{{ $t('offer.deleteConfirmation') }}</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.cancellation') }}</v-btn>
                    <v-btn color="blue darken-1" text @click="">{{ $t('offer.ok') }}</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editing(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click=""
            >
              mdi-delete
            </v-icon>
            <v-icon
              small
              class="ml-2"
              @click=""
            >
              mdi-account
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "users",
        layout: 'admin-bar',
        async fetch({store}) {
            await store.dispatch('admin/getUsersAction');
        },
        data() {
            return {
                headersIndividualUser: [],
                headersLegalUser: [],
                users: [],
                dialog: false,
                dialogDelete: false
            }
        },
        created() {
            this.filledHeaders();
        },
        computed: {
            getIndividualUsers() {
                return this.$store.getters['admin/getIndividualUsers']
            },

            getLegalUsers() {
                return this.$store.getters['admin/getLegalUsers']
            }
        },
        methods: {
            filledHeaders() {
                this.headersIndividualUser = [
                    {
                        text: 'id',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    {text: this.$t('settings.email'), value: 'email'},
                    {text: this.$t('settings.name'), value: 'firstName'},
                    {text: this.$t('settings.surname'), value: 'lastName'},
                    {text: this.$t('settings.patronymic'), value: 'patronymic'},
                    {text: this.$t('settings.phone'), value: 'phone'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ];

                this.headersLegalUser = [
                    {
                        text: 'id',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    {text: this.$t('settings.email'), value: 'email'},
                    {text: this.$t('settings.fullName'), value: 'fullName'},
                    {text: this.$t('settings.phone'), value: 'phone'},
                    {text: this.$t('adminPanel.companyName'), value: 'companyName'},
                    {text: this.$t('adminPanel.companyCode'), value: 'companyCode'},
                    {text: this.$t('offer.actions'), value: 'actions', sortable: false}
                ];
            },

            editing(id) {
                this.$router.push('/admin-panel/users/' + id)
            }
        }
    }
</script>

<style scoped>

</style>
