<template>
  <div
    v-if="getUser"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        md="12"
        lg="12"
      >
        <v-card
          max-width="1000"
          max-height="600"
          height="600"
          class="mx-auto mt-10"
        >
          <v-toolbar
            flat
          >
            <v-toolbar-title>
              {{ $t('chat.title') }}
            </v-toolbar-title>
          </v-toolbar>
          <v-divider></v-divider>
          <v-row>
            <v-col
              cols="12"
              md="4"
              lg="4"
            >
              <v-toolbar
                flat
              >
                <v-text-field
                  class="ml-3 mt-8"
                  :label="$t('chat.search')"
                  prepend-inner-icon="search"
                  outlined
                  dense
                  rounded
                >
                </v-text-field>
              </v-toolbar>

              <v-list v-if="getUsersChats != null">
                <template v-for="user in getUsersChats">
                  <v-list-item
                    :key="user.id"
                    @click="getMessages(user)"
                  >
                    <v-list-item-avatar
                      size="50"
                    >
                      <template
                        v-if="user.profilePicture"
                      >
                        <v-img
                          :src="user.profilePicture"
                        ></v-img>
                      </template>

                      <template
                        v-else
                      >
                        <v-icon
                          size="40"
                        >
                          mdi-account-circle
                        </v-icon>
                      </template>
                    </v-list-item-avatar>

                    <template
                      v-if="user.firstName != null"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-html="user.firstName + ' ' + user.lastName"></v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <template
                      v-else
                    >
                      <v-list-item-content>
                        <v-list-item-title v-html="user.fullName"></v-list-item-title>
                      </v-list-item-content>
                    </template>


                    <v-list-item-icon>
                      <v-icon :color="'blue darken-3'">mdi-chat</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </template>
              </v-list>
            </v-col>

            <v-col
              cols="12"
              md="8"
              lg="8"
            >
              <div
                v-if="!dialog"
                class="title grey&#45;&#45;text text&#45;&#45;lighten-1 font-weight-light text-center"
                style="align-self: center;"
              >
              <span>
                {{ $t('chat.selectUser') }}
              </span>
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
                    <template
                      v-if="getUserCompanion.profilePicture"
                    >
                      <v-img
                        :src="getUserCompanion.profilePicture"
                      ></v-img>
                    </template>

                    <template
                      v-else
                    >
                      <v-icon
                        size="40"
                      >
                        mdi-account-circle
                      </v-icon>
                    </template>
                  </v-avatar>
                  <span
                    class="ml-4"
                    v-if="getUserCompanion.firstName !== null"
                  >
                    {{ getUserCompanion.firstName }} {{ getUserCompanion.lastName}}
                  </span>
                  <span
                    v-else
                  >
                    {{ getUserCompanion.fullName }}
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
                  id="container"
                  class="my-list"
                >
                  <template
                    v-for="item in listMessages"
                  >
                    <v-row
                      :key="item.id"
                    >
                      <v-col
                        v-if="(item.user !== null && (item.user === getUser.id || item.user.id === getUser.id))"
                        align-self="end"
                        lg="12"
                      >
                        <v-avatar
                          size="35"
                        >
                          <template
                            v-if="getUser.profilePicture"
                          >
                            <v-img
                              :src="getUser.profilePicture"
                            ></v-img>
                          </template>

                          <template
                            v-else
                          >
                            <v-icon
                              size="40"
                            >
                              mdi-account-circle
                            </v-icon>
                          </template>
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
                          <template
                            v-if="getUserCompanion.profilePicture"
                          >
                            <v-img
                              :src="getUserCompanion.profilePicture"
                            ></v-img>
                          </template>

                          <template
                            v-else
                          >
                            <v-icon
                              size="40"
                            >
                              mdi-account-circle
                            </v-icon>
                          </template>
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
                    :label="$t('chat.writeMessage')"
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
    import profilePageAvatar from '../assets/AllisonProfilePage.jpg'
    import MessageRow from "../components/chat/MessageRow";
    import {connect, addHandler} from '../util/ws'

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

            checkRoleUser() {
                let user = this.$store.getters['cargo/getUserFromCargo'];
                return user.roles.map(role => role.name).includes('ROLE_LEGAL_USER');
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

                await this.$store.dispatch('chat/getMessagesAction', body)
                    .then(() => {
                        this.dialog = true;
                    });
                this.scrollToEnd();
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

                if (this.message !== '' && this.message !== null) {
                    await this.$store.dispatch('chat/sendMessageAction', body);
                    this.scrollToEnd();
                }

                this.message = '';
            },

            scrollToEnd() {
                const container = this.$el.querySelector("#container");
                container.scrollTop = container.scrollHeight;
            }
        }
    }
</script>

<style scoped>
  .my-list {
    max-height: 390px;
    width: 100%;
    overflow-y: auto;
  }
</style>
