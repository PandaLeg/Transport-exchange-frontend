import authHeader from '../service/auth-header'


const API_URL = 'http://localhost:9090/transport/';

export const state = () => ({
  initialTransport: {},
  listPlacesTransport: [],
  propertiesTransport: {},
  transports: [],
  transportsAfterSearch: [],
  dataForSearchTransport: {},
  transportView: {},
  listPointsTransports: [],
  listPointsTransport: [],
  listPhotoTransport: [],
  resultSearch: {},
  pathToSearch: '',
  currentPage: 1,
  totalPages: 0,
  pageSize: 3,
  listArg: [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9'
  ],
  listLoadingCar: [
    'Верхняя', 'Задняя', 'Боковая',
    'Со снятием стоек', 'Со снятием поперечин',
    'С полной растентовкой', 'Без ворот'
  ],
  listPermissions: [
    'TIR', 'CMR', 'T1', 'ЕКМТ/CEMT'
  ],
  typesPayment: ['Сумма', 'Запрос ставки'],
  listCurrency: [
    'EUR', 'USD', 'UAH',
    'BYN', 'RUB', 'KZT',
    'PLN', 'UZS'
  ],
  listCostPer: [
    'км', 'сутки'
  ],
  listFormPayment: [
    'наличными', 'безналичными', 'комбинированная', 'карта', 'электронный платёж'
  ],
  listTimePayment: [
    'на загрузке', 'на выгрузке', 'по оригиналам'
  ],
});

export const mutations = {
  setPropertiesTransport(state, properties) {
    state.propertiesTransport = properties;
  },

  setPlacesTransport(state, places) {
    state.listPlacesTransport = places;
  },

  addTransportMutation(state, transport) {
    console.log(transport);
    state.transports = [
      ...state.transports,
      transport
    ]
  },

  searchTransportMutation(state, transports) {
    state.transportsAfterSearch = transports;
  },

  setDataForSearchTransport(state, dataForQuery) {
    state.dataForSearchTransport = dataForQuery.data;
    state.currentPage = dataForQuery.page;
    state.pageSize = dataForQuery.pageSize;
  },

  setTransportView(state, transportView) {
    state.transportView = transportView;
  },

  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },

  setTotalPages(state, totalPages) {
    state.totalPages = totalPages;
  },

  clearTransportsAfterSearch(state) {
    state.transportsAfterSearch = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки транспорт
  setCookieResultSearch(state, resultSearch) {
    const data = this.$cookies.get('resultTransportDataSearch');
    if (data === null || data === undefined) {
      this.$cookies.set('resultTransportDataSearch', resultSearch, {maxAge: 100000});
    }
  },

  setResultDataSearch(state) {
    const data = this.$cookies.get('resultTransportDataSearch');

    if (data !== null && data !== undefined) {
      state.resultSearch = data;
      state.pathToSearch = '/transport/search-transport/search';
      if (data.pageSize === undefined) {
        state.pageSize = 3;
      } else {
        state.pageSize = data.pageSize;
      }
    } else {
      state.pathToSearch = '/transport/search-transport';
    }
  },

  setPointsTransports(state, data) {
    state.listPointsTransports = data;
  },

  setPointsTransport(state, data) {
    state.listPointsTransport = data;
  },

  setPhotosTransport(state, data) {
    state.listPhotoTransport = data;
  }
};

export const actions = {
  async addTransportAction({commit, state}, store) {
    const response = await this.$axios.post(API_URL + 'add-transport', store.formData,
      {
        headers: Object.assign(authHeader(store.store), {"Content-Type": undefined}),
        params: {lang: 'ru', token: store.userToken}
      });
    const data = await response.data;

    console.log("Transport Action", data);

    if (data) {
      commit('addTransportMutation', data)
    }
  },

  async searchTransportAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'search-transport', body.data,
      {headers: authHeader(body.store), params: {page: body.page, pageSize: body.pageSize}});
    const data = await response.data;

    if (data) {
      commit('searchTransportMutation', data.transports);
      commit('setPointsTransports', data.pointsLUTransports);
      commit('setCurrentPage', data.currentPage);
      commit('setTotalPages', data.totalPages);
    }
  },

  async getTransportAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-transport/' + id);
    const data = await response.data;

    if (data) {
      commit('setTransportView', data)
    }
  },

  async getPlacesTransportAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-points-transport', {params: {id}});
    const data = await response.data;

    if (data) {
      commit('setPointsTransport', data);
    }
  },

  async getPhotosTransportAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-photos-transport/' + id);
    const data = await response.data;

    if (data) {
      commit('setPhotosTransport', data);
    }
  }

};

export const getters = {
  getInitialTransport: state => {
    return state.initialTransport;
  },

  getPlacesTransport: state => {
    return state.listPlacesTransport
  },

  getPropertiesTransport: state => {
    return state.propertiesTransport
  },

  getTransportsAfterSearch: state => {
    return state.transportsAfterSearch;
  },

  getDataForSearchTransport: state => {
    return state.dataForSearchTransport
  },

  getTransportView: state => {
    return state.transportView
  },

  getDataResultSearch: state => {
    return state.resultSearch;
  },

  getPathToSearch: state => {
    return state.pathToSearch
  },

  getPointsTransports: state => {
    return state.listPointsTransports
  },

  getPointsTransport: state => {
    return state.listPointsTransport
  },

  getPhotosTransport: state => {
    return state.listPhotoTransport
  },

  getCurrentPage: state => {
    return state.currentPage
  },

  getTotalPages: state => {
    return state.totalPages
  },

  getPageSize: state => {
    return state.pageSize
  },

  getListArg: state => {
    return state.listArg
  },

  getListLoadingCar: state => {
    return state.listLoadingCar
  },

  getListPermissions: state => {
    return state.listPermissions
  },

  getTypesPayment: state => {
    return state.typesPayment
  },

  getListCurrency: state => {
    return state.listCurrency
  },

  getListCostPer: state => {
    return state.listCostPer
  },

  getListFormPayment: state => {
    return state.listFormPayment
  },

  getListTimePayment: state => {
    return state.listTimePayment
  },
};
