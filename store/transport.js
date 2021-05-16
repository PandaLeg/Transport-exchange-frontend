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
  user: {},
  checkUser: false,
  checkUserFromOffer: false,
  listPointsTransports: [],
  listPointsTransport: [],
  listPhotoTransport: [],
  resultSearch: {},
  pathToSearch: '',
  currentPage: 1,
  totalPages: 0,
  pageSize: 3,
  pointsInside: [],
  pointsFrom: [],
  pointsTo: [],
  listArg: [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9'
  ],
  loadingCar: {
    listRu: [
      'Верхняя', 'Задняя', 'Боковая',
      'Со снятием стоек', 'Со снятием поперечин',
      'С полной растентовкой', 'Без ворот'
    ],
    listEn: [
      'Top', 'Back', 'Side',
      'With racks removal', 'With crossbars removal',
      'With full cover', 'Without gates'
    ],
    listUa: [
      'Верхнє', 'Заднє', 'Бічне',
      'Зі зняттям стійок', 'Зі зняттям поперечин',
      'З повною розтентовкою', 'Без воріт'
    ]
  },
  permission: {
    listRu: [
      'TIR', 'CMR', 'По декларации', 'Медкнижка', 'T1'
    ],
    listEn: [
      'TIR', 'CMR', 'By declaration', 'Medical record', 'T1'
    ],
    listUa: [
      'TIR', 'CMR', 'За декларацією', 'Медкнига', 'T1'
    ],
  },
  paymentType: {
    listRu: [
      'Сумма', 'Запрос ставки'
    ],
    listEn: [
      'Amount', 'Bid request'
    ],
    listUa: [
      'Сума', 'Запит ставки'
    ]
  },
  listCurrency: [
    'EUR', 'USD', 'UAH',
    'BYN', 'RUB', 'KZT',
    'PLN', 'UZS'
  ],
  listCostPer: {
    listRu: [
      'км', 'сутки'
    ],
    listEn: [
      'km', 'day'
    ],
    listUa: [
      'км', 'добу'
    ]
  },
  paymentForm: {
    listRu: [
      'наличными', 'безналичными', 'комбинированная', 'карта', 'электронный платёж'
    ],
    listEn: [
      'cash', 'non-cash', 'combined', 'card', 'electronic payment'
    ],
    listUa: [
      'готівкою', 'безготівкою', 'комбінована', 'карта', 'електронний платіж'
    ]
  },
  paymentTime: {
    listRu: [
      'на загрузке', 'на выгрузке', 'по оригиналам'
    ],
    listEn: [
      'on loading', 'unloading', 'by originals'
    ],
    listUa: [
      'на завантаженні', 'при розвантаженні', 'за оригіналами'
    ]
  },
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

  setPageSize(state, pageSize) {
    if (pageSize === undefined) {
      state.pageSize = 3;
    } else {
      state.pageSize = Number(pageSize);
    }
    console.log("RESULT SEARCH PAGE NON UNDEFINED", state.pageSize);
  },

  clearTransportsAfterSearch(state) {
    state.transportsAfterSearch = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки транспорт
  setCookieResultSearch(state, resultSearch) {
    this.$cookies.set('resultTransportDataSearch', resultSearch, {maxAge: 100000});
  },

  setResultDataSearch(state) {
    const data = this.$cookies.get('resultTransportDataSearch');

    if (data !== null && data !== undefined) {
      state.resultSearch = data;
      state.pathToSearch = (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
        '/transport/search-transport/search';
    } else {
      state.pathToSearch = (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
        '/transport/search-transport';
    }
  },

  setUserTransport(state, data) {
    state.user = data;
    state.checkUser = state.user.roles.map(item => item.name).includes('ROLE_USER')
  },

  setPointsTransports(state, data) {
    state.listPointsTransports = data;
  },

  setPointsTransport(state, data) {
    state.listPointsTransport = data;
  },

  setPhotosTransport(state, data) {
    state.listPhotoTransport = data;
  },

  checkUserFromOffer(state, data) {
    console.log("TRANSPORT FROM OFFER", data.idTransport);
    data.transports.map(item => {
      if (item.id === data.idTransport) {
        state.checkUserFromOffer = true;
      }
    });
    console.log("CHECK USER FROM OFFER", state.checkUserFromOffer);
  },

  setCheckUserFromOffer(state) {
    state.checkUserFromOffer = false;
  },

  setCountPlaces(state, data) {
    state.pointsInside = data.pointsInside;
    state.pointsFrom = data.pointsFrom;
    state.pointsTo = data.pointsTo;
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
      commit('setTransportView', data.transport);
      commit('setPointsTransport', data.pointsLUTransport);
      commit('setUserTransport', data.user);
    }
  },

  async getPhotosTransportAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-photos-transport/' + id);
    const data = await response.data;

    if (data) {
      commit('setPhotosTransport', data);
    }
  },

  async checkUserSentOfferAction({commit}, body) {
    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');

    const response = await this.$axios.get(API_URL + 'get-sent-offers-transports/' + body.user.id, {
      params: {
        headers: Object.assign(authHeader(body.store)),
        role: checkUserRole ? 'ROLE_USER' : 'ROLE_LEGAL_USER'
      }
    });
    const data = await response.data;

    if (data) {
      commit('checkUserFromOffer', {transports: data, idTransport: body.idTransport});
    }
  },

  async getCountPlaces({commit}, countries) {
    const response = await this.$axios.post(API_URL + 'get-count-places', countries, {
        headers: {"Content-Type": undefined}
      }
    );
    const data = await response.data;

    console.log("COUNT PLACES", data);

    if (data) {
      commit('setCountPlaces', data)
    }
  },
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

  getUserFromTransport: state => {
    return state.user
  },

  checkUser: state => {
    return state.checkUser
  },

  getCheckUserFromOffer: state => {
    return state.checkUserFromOffer
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

  getPointsInside: state => {
    return state.pointsInside
  },

  getPointsFrom: state => {
    return state.pointsFrom
  },

  getPointsTo: state => {
    return state.pointsTo
  },

  getListArg: state => {
    return state.listArg
  },

  getLoadingCar: state => {
    return state.loadingCar
  },

  getPermission: state => {
    return state.permission
  },

  getPaymentType: state => {
    return state.paymentType
  },

  getListCurrency: state => {
    return state.listCurrency
  },

  getCostPer: state => {
    return state.listCostPer
  },

  getPaymentForm: state => {
    return state.paymentForm
  },

  getPaymentTime: state => {
    return state.paymentTime
  },
};
