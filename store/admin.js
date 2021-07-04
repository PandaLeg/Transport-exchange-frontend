import authHeader from "../service/auth-header";

const API_URL = 'http://localhost:9090/admin/';
const API_USER = 'http://localhost:9090/user/';

export const state = () => ({
  months: [
    'Ja', 'Fe', 'Ma', 'Ap', 'May', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'
  ],
  countCargoOfMonth: [],
  countTransportsOfMonth: [],
  countUsersOfMonth: [],
  labelsOfMonth: [],
  cargoAndTransport: {
    countCargo: 0,
    countCargoToday: 0,
    countTransports: 0,
    countTransportsToday: 0
  },
  individualUsers: [],
  legalUsers: [],
  cargo: [],
  listPointsCargo: [],
  transports: [],
  listPointsTransports: [],
  user: {},
  confirmationNotifications: [],
  currentPage: 1,
  totalPages: 0,
  pageSize: 2,
  confirmationNotification: {},
  dataAboutPage: {},
  pathToSearch: ''
});

export const mutations = {
  setStatisticsOfCargoAndTransport(state, months) {
    state.labelsOfMonth = [];

    if (months.checkOffer) {
      state.countCargoOfMonth = [];
    } else {
      state.countTransportsOfMonth = [];
    }

    state.labelsOfMonth = Object.keys(months.data);

    for (let i = 0; i < state.months.length; i++) {
      let s = Object.keys(months.data).find(item => item === state.months[i] ? item : null);

      if (months.checkOffer) {
        state.countCargoOfMonth.push(months.data[s]);
      } else {
        state.countTransportsOfMonth.push(months.data[s]);
      }
    }
  },

  setStatisticsOfUsers(state, months) {
    state.labelsOfMonth = [];
    state.countUsersOfMonth = [];

    state.labelsOfMonth = Object.keys(months);

    for (let i = 0; i < state.months.length; i++) {
      let s = Object.keys(months).find(item => item === state.months[i] ? item : null);

      state.countUsersOfMonth.push(months[s]);
    }
  },

  setCountCargoAndTransport(state, data) {
    state.cargoAndTransport = Object.assign({},
      {countCargo: data.countCargo},
      {countCargoToday: data.countCargoToday},
      {countTransports: data.countTransports},
      {countTransportsToday: data.countTransportsToday},
    );
  },

  setUsers(state, data) {
    state.individualUsers = data.individualUsers;
    state.legalUsers = data.legalUsers;
  },

  setCargoAndTransports(state, data) {
    state.cargo = data.cargo;
    state.listPointsCargo = data.listPointsCargo;
    state.transports = data.transports;
    state.listPointsTransports = data.listPointsTransports;
  },

  clearOffers(state) {
    state.cargo = [];
    state.listPointsCargo = [];
    state.transports = [];
    state.listPointsTransports = []
  },

  setUserFromAdminPanel(state, user) {
    state.user = user;
  },

  setConfirmationNotifications(state, confirmations) {
    state.confirmationNotifications = confirmations;
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },

  setTotalPages(state, totalPages) {
    state.totalPages = totalPages;
  },

  setPageSize(state, pageSize) {
    if (pageSize === undefined) {
      state.pageSize = 2;
    } else {
      state.pageSize = Number(pageSize);
    }
  },

  clearConfirmationNotifications(state) {
    state.confirmationNotifications = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки груза
  setCookiePageNotifications(state, page) {
    this.$cookies.set('pageNotifications', page, {maxAge: 100000});
  },

  setPathToSearch(state) {
    const data = this.$cookies.get('pageNotifications');

    if (data !== null && data !== undefined) {
      state.dataAboutPage = data;
    }
    state.pathToSearch = (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
      '/admin-panel/notifications';
  },

  setConfirmationNotification(state, notification) {
    state.confirmationNotification = notification;
  }
};

export const actions = {
  async statisticsCargoAction({commit}) {
    const response = await this.$axios.get(API_URL + 'statistics-of-cargo');
    const data = await response.data;

    if (data) {
      commit('setStatisticsOfCargoAndTransport', {data, checkOffer: true});
    }
  },

  async statisticsTransportAction({commit}) {
    const response = await this.$axios.get(API_URL + 'statistics-of-transports');
    const data = await response.data;

    if (data) {
      commit('setStatisticsOfCargoAndTransport', {data, checkOffer: false});
    }
  },

  async statisticsUsersActions({commit}) {
    const response = await this.$axios.get(API_URL + 'statistics-of-users');
    const data = await response.data;

    if (data) {
      commit('setStatisticsOfUsers', data);
    }
  },

  async statisticsCountsCargoAndTransportActions({commit}) {
    const response = await this.$axios.get(API_URL + 'statistics-count-of-cargo-transports');
    const data = await response.data;

    if (data) {
      commit('setCountCargoAndTransport', data);
    }
  },

  async getUsersAction({commit}) {
    const response = await this.$axios.get(API_URL + 'get-users');
    const data = await response.data;

    if (data) {
      commit('setUsers', data);
    }
  },

  async getCargoAndTransport({commit}) {
    const response = await this.$axios.get(API_URL + 'get-cargo-transports');
    const data = await response.data;

    if (data) {
      commit('setCargoAndTransports', data);
    }
  },

  async getUserFromAdminPanelAction({commit}, body) {
    const response = await this.$axios.get(API_URL + 'get-user-from-admin-panel/' + body.id, {
      headers: authHeader(body.store)
    });
    const data = await response.data;

    if (data) {
      commit('setUserFromAdminPanel', data);
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  },

  async updatePersonalDataAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'update-personal-data', body.formData, {
      headers: Object.assign({}, authHeader(body.store), {"Content-Type": undefined})
    });
    const data = await response.data;

    if (data) {
      return Promise.resolve();
    } else {
      return Promise.reject(error);
    }
  },

  async updateCargoAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'update-cargo', body.formData, {
      headers: Object.assign({}, authHeader(body.store), {"Content-Type": undefined}),
      params: {typeTransportation: body.typeTransportation}
    });
    const data = await response.data;

    console.log(data);
  },

  async deleteCargoAction({commit}, body) {
    const response = await this.$axios.delete(API_URL + 'delete-cargo',{
      headers: authHeader(body.store),
      params: {id: body.id}
    });
    const data = await response.data;

    console.log(data);
  },

  async updateTransportAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'update-transport', body.formData, {
      headers: Object.assign({}, authHeader(body.store), {"Content-Type": undefined})
    });
    const data = await response.data;

    if(data){
      return Promise.resolve();
    }
  },

  async deleteTransportAction({commit}, body) {
    const response = await this.$axios.delete(API_URL + 'delete-transport',{
      headers: authHeader(body.store),
      params: {id: body.id}
    });
    const data = await response.data;

    if(data){
      return Promise.resolve();
    }
  },

  async getConfirmationNotificationsAction({commit}, body) {
    const response = await this.$axios.get(API_URL + 'get-confirmations',
      {
        headers: Object.assign(authHeader(body.store)),
        params: {page: body.page, pageSize: body.pageSize}
      });
    const data = await response.data;

    if (data) {
      commit('setConfirmationNotifications', data.confirmations);
      commit('setCurrentPage', data.currentPage);
      commit('setTotalPages', data.totalPages);

      return Promise.resolve();
    }
  },

  async getConfirmationNotificationAction({commit}, body) {
    const response = await this.$axios.get(API_URL + 'get-confirmation/' + body.id,
      {
        headers: Object.assign(authHeader(body.store))
      });
    const data = await response.data;

    console.log(data);

    if (data) {
      commit('setConfirmationNotification', data);
      return Promise.resolve(data);
    }
  },

  async confirmationCompanyAction({commit}, body) {
    const response = await this.$axios.put(API_URL + 'confirmation-company/' + body.id, {},
      {
        headers: Object.assign(authHeader(body.store))
      });
    const data = await response.data;

    if (data) {
      return Promise.resolve();
    }
  }
};

export const getters = {
  getLabelsOfMonth: state => {
    return state.labelsOfMonth
  },

  getCountCargoOfMonth: state => {
    return state.countCargoOfMonth
  },

  getCountTransportsOfMonth: state => {
    return state.countTransportsOfMonth
  },

  getCountUsersOfMonth: state => {
    return state.countUsersOfMonth
  },

  getCargoAndTransport: state => {
    return state.cargoAndTransport
  },

  getIndividualUsers: state => {
    return state.individualUsers
  },

  getLegalUsers: state => {
    return state.legalUsers
  },

  getCargo: state => {
    return state.cargo
  },

  getPointsCargo: state => {
    return state.listPointsCargo
  },

  getTransports: state => {
    return state.transports
  },

  getPointsTransports: state => {
    return state.listPointsTransports
  },

  getUser: state => {
    return state.user
  },

  getCurrentPage: state => {
    return state.currentPage
  },

  getConfirmationNotifications: state => {
    return state.confirmationNotifications
  },

  getTotalPages: state => {
    return state.totalPages
  },

  getPageSize: state => {
    return state.pageSize
  },

  getConfirmationNotification: state => {
    return state.confirmationNotification
  },

  getDataAboutPage: state => {
    return state.dataAboutPage
  },

  getPathToSearch: state => {
    return state.pathToSearch
  }
};
