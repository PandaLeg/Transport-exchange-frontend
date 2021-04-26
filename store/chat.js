import authHeader from "../service/auth-header";

const API_URL = 'http://localhost:9090/chat/';

export const state = () => ({
  messages: [],
  users: [],
  legalUsers: [],
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
    state.legalUsers = data.legalUsers;
  }
};

export const actions = {
  async sendMessageAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');
    let checkUserRoleFromCargo = body.userCompanion.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.post(API_URL + 'add-message', body.chatMessage,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {
          role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER', idUser: body.user.id,
          roleUserFromCargo: checkUserRoleFromCargo ? 'ROLE_USER' : 'ROLE_LEGAL_USER',
          idUserCompanion: body.userCompanion.id,
        }
      });
    const data = await response.data;

    console.log("MESSAGE ADDED", data);
  },

  async getUsersOfChatsAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-users-of-chats/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {
          role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'
        }
      });
    const data = await response.data;

    console.log("USERS OF CHATS", data);
    if (data) {
      commit('setUsers', data)
    }
  },

  async getMessagesAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');
    let checkUserCompanionRole = body.userCompanion.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-messages/' + body.user.id,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {
          role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER',
          roleUserCompanion: checkUserCompanionRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER',
          idChat: body.idChat,
          idUserCompanion: body.userCompanion.id,
        }
      });
    const data = await response.data;

    console.log("GET MESSAGES", data);
    if (data) {
      commit('setMessages', data);
    }
  }
};

export const getters = {
  getUsersChats: state => {
    return state.users;
  },

  getLegalUsersChats: state => {
    return state.legalUsers;
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
