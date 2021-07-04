import authHeader from "../service/auth-header";

const API_URL = 'http://localhost:9090/chat/';

export const state = () => ({
  messages: [],
  users: [],
  user: {},
  userCompanion: {}
});

export const mutations = {
  setMessages(state, data) {
    state.user = {};
    state.userCompanion = {};
    state.messages = [];

    state.messages = data.messages;
    state.user = data.user;
    state.userCompanion = data.userCompanion;
  },

  addMessage(state, message) {
    state.messages.push(message);
    console.log("ADD HANDLER", state.messages);
  },

  setUsers(state, data) {
    state.users = data.users;
  }
};

export const actions = {
  async sendMessageAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'add-message', body.chatMessage,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {
          idUser: body.user.id,
          idUserCompanion: body.userCompanion.id,
        }
      });
    const data = await response.data;

    console.log("MESSAGE ADDED", data);
  },

  async getUsersOfChatsAction({commit}, body) {
    const response = await this.$axios.get(API_URL + 'get-users-of-chats/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store))
      });
    const data = await response.data;

    console.log("USERS OF CHATS", data);
    if (data) {
      commit('setUsers', data)
    }
  },

  async getMessagesAction({commit}, body) {
    const response = await this.$axios.get(API_URL + 'get-messages/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {
          idChat: body.idChat,
          idUserCompanion: body.userCompanion.id,
        }
      });
    const data = await response.data;

    console.log("GET MESSAGES", data);
    if (data) {
      commit('setMessages', data);
      return Promise.resolve();
    }
  }
};

export const getters = {
  getUsersChats: state => {
    return state.users;
  },

  listMessages: state => {
    return state.messages
  },

  getUserFromChat: state => {
    return state.user
  },

  getUserCompanion: state => {
    return state.userCompanion
  }
};
