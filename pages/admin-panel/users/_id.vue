<template>
  <v-container class="mt-4">
    <v-row>
      <v-col
        lg="8"
      >
        <v-card class="text-center">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-title></v-card-title>
            <v-container>
              <v-row no-gutters align="center" justify="center">
                <v-col
                  cols="12"
                  md="12"
                  lg="12"
                >
                  <v-avatar
                    class="avatar-profile-and-name"
                    size="150"
                  >
                    <v-img
                      :src="profilePicture"
                    >
                    </v-img>
                  </v-avatar>
                </v-col>

                <v-col
                  class="mt-5"
                  cols="12"
                  md="12"
                  lg="12"
                >
                  <v-btn
                    plain
                    :loading="isSelecting"
                    @click="onLoadingPhoto"
                  >
                    {{ $t('settings.add') }}
                  </v-btn>
                  <input
                    ref="image"
                    class="d-none"
                    type="file"
                    accept="image/*"
                    @change="onFileChanged"
                  >
                </v-col>
              </v-row>

              <template
                v-if="checkRole"
              >
                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.fullName') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="fullName"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>

              <template
                v-else
              >
                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.surname') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="surname"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.name') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="name"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      {{ $t('settings.patronymic') }}:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="patronymic"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>

              <v-row
                align="start" justify="start"
              >
                <v-col
                  md="2"
                  lg="2"
                >
                  <v-subheader>
                    {{ $t('settings.phone') }}:
                  </v-subheader>
                </v-col>
                <v-col
                  cols="12"
                  md="10"
                  lg="10"
                >
                  <v-text-field
                    v-model="phone"
                    color="blue-grey lighten-2"
                    filled
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row
                align="start" justify="start"
              >
                <v-col
                  md="2"
                  lg="2"
                >
                  <v-subheader>
                    {{ $t('settings.email') }}:
                  </v-subheader>
                </v-col>
                <v-col
                  cols="12"
                  md="10"
                  lg="10"
                >
                  <v-text-field
                    v-model="email"
                    color="blue-grey lighten-2"
                    filled
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>

              <template
                v-if="checkRole"
              >
                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Компания:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="companyName"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row
                  align="start" justify="start"
                >
                  <v-col
                    md="2"
                    lg="2"
                  >
                    <v-subheader>
                      Код:
                    </v-subheader>
                  </v-col>
                  <v-col
                    cols="12"
                    md="10"
                    lg="10"
                  >
                    <v-text-field
                      v-model="companyCode"
                      color="blue-grey lighten-2"
                      filled
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
            </v-container>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              plain
              @click="updateUser"
            >
              Обновить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="4"
      >
        <v-card>
          <v-card-title>Контактная информация</v-card-title>
          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="3"
                lg="3"
              >
                {{ $t('settings.fullName') }}:
              </v-col>
              <v-col
                cols="12"
                md="9"
                lg="9"
              >
                <template
                  v-if="checkRole"
                >
                  <span class="list-subtitle-information-font">
                    {{ userFromAdminPanel.fullName }}
                  </span>
                </template>
                <template
                  v-else
                >
                  <span class="list-subtitle-information-font">
                    {{ userFromAdminPanel.firstName }}
                    {{ userFromAdminPanel.lastName }}
                    {{ userFromAdminPanel.patronymic }}
                  </span>
                </template>
              </v-col>
            </v-row>
          </div>
          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="3"
                lg="3"
              >
                Email:
              </v-col>
              <v-col
                cols="12"
                md="9"
                lg="9"
              >
                <span class="list-subtitle-information-font">{{ userFromAdminPanel.email }}</span>
              </v-col>
            </v-row>
          </div>

          <div class="list-title-information-font ml-5 mt-3">
            <v-row>
              <v-col
                cols="12"
                md="3"
                lg="3"
              >
                {{ $t('settings.phoneNumber') }}:
              </v-col>
              <v-col
                cols="12"
                md="9"
                lg="9"
              >
                <span class="list-subtitle-information-font">{{ userFromAdminPanel.phone }}</span>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import profilePageAvatar from '../../../assets/AllisonProfilePage.jpg'
    import {faUserEdit} from '@fortawesome/free-solid-svg-icons'

    export default {
        name: "admin-panel-users-id",
        layout: 'admin-bar',
        data() {
            return {
                surname: '',
                name: '',
                patronymic: '',
                fullName: '',
                phone: '',
                email: '',
                companyName: '',
                companyCode: '',
                isSelecting: false,
                photoProfile: null,
                photoUrl: '',
                formData: null,
                valid: true,
                checkRole: false
            }
        },
        computed: {
            faUserEdit() {
                return faUserEdit
            },

            userFromAdminPanel() {
                return this.$store.getters['admin/getUser']
            },

            profilePicture() {
                return this.photoUrl
            }
        },
        methods: {
            async getUser() {
                let body = {
                    id: this.$route.params.id,
                    store: this.$store
                };

                await this.$store.dispatch('admin/getUserFromAdminPanelAction', body)
                    .then(response => {
                        this.phone = response.phone;
                        this.email = response.email;
                        this.photoUrl = response.profilePicture ? response.profilePicture : profilePageAvatar;

                        this.checkRole = response.roles.map(role => role.name).includes('ROLE_LEGAL_USER');

                        if (this.checkRole) {
                            this.fullName = response.fullName;
                            this.companyName = response.companyName;
                            this.companyCode = response.companyCode;
                        } else {
                            this.surname = response.lastName;
                            this.name = response.firstName;
                            this.patronymic = response.patronymic;
                        }
                    }).catch(error => {
                        console.log(error);
                    })
            },

            async updateUser() {
                this.formData = new FormData();

                const personalData = {
                    id: this.userFromAdminPanel.id,
                    lastName: this.surname,
                    firstName: this.name,
                    patronymic: this.patronymic,
                    phone: this.phone,
                    email: this.email,
                    companyName: this.companyName,
                    companyCode: this.companyCode
                };

                this.formData.append("photo", this.photoProfile);
                this.formData.append("personalData", new Blob([JSON.stringify(personalData)],
                    {type: "application/json"}));

                await this.$store.dispatch('admin/updatePersonalDataAction', {
                    store: this.$store, formData: this.formData
                })
                    .then(
                        () => {
                            this.$router.push('/admin-panel/users')
                        }, error => {
                            console.log(error);
                        }
                    );
            },

            onLoadingPhoto() {
                this.isSelecting = true;
                window.addEventListener('focus', () => {
                    this.isSelecting = false
                }, {once: true});

                this.$refs.image.click()
            },

            onFileChanged(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    if (files[0].name.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);

                    fr.addEventListener('load', () => {
                        this.photoUrl = fr.result;
                        this.photoProfile = files[0];
                        console.log("SELECTED 1", this.photoProfile);
                    });
                }
            },
        },
        mounted() {
            this.getUser();
        }
    }
</script>

<style scoped>

</style>
