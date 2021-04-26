<template>
  <div
    v-if="getUser"
  >
    <v-card
      max-width="1000"
      max-height="550"
      height="550"
      class="mx-auto mt-10"
    >
      <v-toolbar
        flat
      >
        <v-toolbar-title>
          Чат
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container fluid>
        <v-row>
          <div style="flex-basis: 30%">
            <v-toolbar
              flat
            >
              <v-text-field
                class="ml-3 mt-8"
                label="Поиск"
                prepend-inner-icon="search"
                outlined
                dense
                rounded
              >
              </v-text-field>
            </v-toolbar>
            <v-list v-if="getLegalUsersChats != null">
              <template v-for="legalUser in getLegalUsersChats">
                <v-list-item
                  :key="legalUser.id"
                  @click="getMessages(legalUser)"
                >
                  <v-list-item-avatar
                    size="40"
                  >
                    <v-img
                      :src="legalUser.profilePicture ? legalUser.profilePicture : profilePageAvatar"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="legalUser.firstName + ' ' + legalUser.lastName"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="'blue darken-3'">mdi-chat</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
            </v-list>

            <v-list v-if="getUsersChats != null">
              <template v-for="user in getUsersChats">
                <v-list-item
                  :key="user.id"
                  @click="getMessages(user)"
                >
                  <v-list-item-avatar
                    size="50"
                  >
                    <v-img
                      :src="user.profilePicture ? user.profilePicture : profilePageAvatar"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="user.firstName + ' ' + user.lastName"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon :color="'blue darken-3'">mdi-chat</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
            </v-list>
          </div>

          <v-divider vertical></v-divider>

          <div style="flex-basis: 69.9%">
            <div
              v-if="!dialog"
              class="title grey&#45;&#45;text text&#45;&#45;lighten-1 font-weight-light text-center"
              style="align-self: center;"
            >
              <v-card
                color="grey lighten-5"
                flat
                height="486"
                max-height="550"
              >
                Нет сообщений
              </v-card>
            </div>

            <v-card
              v-else
              color="grey lighten-5"
              flat
            >
              <v-toolbar flat>
                <v-avatar
                  size="40"
                >
                  <v-img
                    :src="getUserCompanion.profilePicture ? getUserCompanion.profilePicture : profilePageAvatar"
                  ></v-img>
                </v-avatar>
                <span
                  class="ml-4"
                >
                {{ getUserCompanion.firstName }} {{ getUserCompanion.lastName}}
              </span>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-reply</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text
                class="my-list"
              >
                <template
                  v-for="item in listMessages"
                >
                  <v-row
                    no-gutters
                    :key="item.id"
                  >
                    <v-col
                      v-if="(item.user !== null &&
              (item.user === getUser.id || item.user.id === getUser.id)) || (item.legalUser !== null &&
              (item.legalUser === getUser.id || item.legalUser.id === getUser.id))"
                      align-self="end"
                      lg="12"
                    >
                      <v-avatar
                        size="35"
                      >
                        <v-img
                          :src="getUser.profilePicture ? getUser.profilePicture : profilePageAvatar"
                        ></v-img>
                      </v-avatar>
                      <v-chip
                        style="height:auto;white-space: normal;"
                        class="pa-3 mb-2 primary"
                      >
                        {{item.message}}
                      </v-chip>
                    </v-col>
                    <v-col
                      v-else
                      align-self="start"
                      lg="12"
                    >
                      <v-avatar
                        size="35"
                      >
                        <v-img
                          :src="getUserCompanion.profilePicture ? getUserCompanion.profilePicture : profilePageAvatar"
                        ></v-img>
                      </v-avatar>
                      <v-chip
                        style="height:auto;white-space: normal;"
                        class="pa-3 mb-2"
                      >
                        {{item.message}}
                      </v-chip>
                    </v-col>
                  </v-row>
                </template>
              </v-card-text>

              <v-card-text>
                <v-text-field
                  v-model="message"
                  label="Написать"
                  type="text"
                  no-details
                  dense
                  outlined
                  append-outer-icon="send"
                  @click:append-outer="sendMessage"
                  hide-details
                >

                </v-text-field>
              </v-card-text>
            </v-card>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
    import profilePageAvatar from '../assets/AllisonProfilePage.jpg'
    import MessageRow from "../components/chat/MessageRow";
    import {connect, addHandler} from '../utils/ws'

    export default {
        name: "chat",
        components: {
            MessageRow
        },
        async fetch({store, app}) {
            let body = {
                user: store.getters['getUser'],
                store: store
            };
            console.log("BODY USER", body.user);
            await store.dispatch('chat/getUsersOfChatsAction', body);

            if (body.user.chats.length === 0) {
                await store.dispatch('getUserAction', app.$cookies.get('token'));
            }
        },
        data() {
            return {
                message: '',
                profilePageAvatar: profilePageAvatar,
                dialog: false
            }
        },
        created() {
            connect();
            addHandler(data => {
                if (data.objectType === 'MESSAGE') {
                    let index = this.$store.getters['chat/listMessages'].find((i) => i.id === data.body.id);

                    console.log("INDEX MESSAGE", index);
                    switch (data.eventType) {
                        case 'CREATE':
                            if (index === undefined) {
                                this.$store.commit('chat/addMessage', data.body);
                            }
                            break;
                        default:
                            console.error(`Looks like the event type if unknown "${data.eventType}"`)
                    }
                } else {
                    console.error(`Looks like the object type if unknown "${data.objectType}" `)
                }
            })
        },
        computed: {
            getUser() {
                return this.$store.getters['getUser']
            },

            getUserFromChat() {
                return this.$store.getters['chat/getUserFromChat']
            },

            getUserCompanion() {
                return this.$store.getters['chat/getUserCompanion']
            },

            getUsersChats() {
                return this.$store.getters['chat/getUsersChats']
            },

            getLegalUsersChats() {
                return this.$store.getters['chat/getLegalUsersChats']
            },

            listMessages() {
                return this.$store.getters['chat/listMessages']
            }
        },
        methods: {
            async getMessages(user) {
                let idChat = null;

                for (let i = 0; i < this.getUser.chats.length; i++) {
                    for (let j = 0; j < user.chats.length; j++) {
                        if (this.getUser.chats[i].id === user.chats[i].id) {
                            idChat = this.getUser.chats[i].id;
                        }
                    }
                }

                console.log("GET USER", this.getUser);
                console.log("GET USER", user);
                const body = {
                    user: this.getUser,
                    userCompanion: user,
                    idChat: idChat,
                    store: this.$store
                };

                await this.$store.dispatch('chat/getMessagesAction', body);
                this.dialog = true;
            },

            async sendMessage() {
                const chatMessage = Object.assign({}, {
                    message: this.message
                });

                const body = {
                    user: this.getUser,
                    userCompanion: this.getUserCompanion,
                    chatMessage: chatMessage,
                    store: this.$store
                };

                console.log("USER", body.user);
                console.log("USER Companion", body.userCompanion);
                if (this.message !== '' && this.message !== null) {
                    await this.$store.dispatch('chat/sendMessageAction', body);
                }

                this.message = '';
            }
        }
    }
</script>

<style scoped>
  .my-list {
    height: 350px;
    overflow-y: auto;
  }
</style>
