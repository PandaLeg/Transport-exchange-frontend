import authHeader from '../service/auth-header'


const API_URL = 'http://localhost:9090/cargo/';

export const state = () => ({
  initialCargo: {},
  listPlacesCargo: [],
  propertiesCargo: {},
  cargo: [],
  cargoAfterSearch: [],
  dataForSearchCargo: {},
  listPointsAllCargo: [],
  listPointsCargo: [],
  listPhotoCargo: [],
  listFilesCargo: [],
  cargoView: {},
  user: {},
  checkUser: false,
  checkUserFromOffer: false,
  resultSearch: {},
  pathToSearch: '',
  currentPage: 1,
  totalPages: 0,
  pageSize: 3,
  permissions: [],
  pointsInside: [],
  pointsFrom: [],
  pointsTo: [],
  transportation: {
    listRu: [
      'Автоперевозка', 'Морская перевозка', 'Ж/Д перевозка'
    ],
    listEn: [
      'Road transportation', 'Sea transportation', 'Railway transportation'
    ],
    listUa: [
      'Автоперевезення', 'Морське перевезення', 'Залізничне перевезення'
    ]
  },
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
  permissionForTrain: {
    listRu: [
      'Ж/Д накладная'
    ],
    listEn: [
      'Railway Bill'
    ],
    listUa: [
      'Залізнична накладна'
    ],
  },
  incoterms: [
    'CFR', 'CIF', 'CPT', 'CIP',
    'DAT', 'DAP', 'DDP',
    'EXW',
    'FCA', 'FAS', 'FOB'
  ],
  loadingVessel: {
    listRu: [
      'LCL(неполная)', 'FCL(полная)'
    ],
    listEn: [
      'LCL(incomplete)', 'FCL(full)'
    ],
    listUa: [
      'LCL(неповна)', 'FCL(повна)'
    ]
  },
  paymentType: {
    listRu: [
      'Сумма', 'Запрос ставки'
    ],
    listEn:
      [
        'Amount', 'Bid request'
      ],
    listUa:
      [
        'Сума', 'Запит ставки'
      ]
  },
  listCurrency: [
    'EUR', 'USD', 'UAH',
    'BYN', 'RUB', 'KZT',
    'PLN', 'UZS'
  ],
  listCostPer:
    {
      listRu: [
        'км', 'сутки'
      ],
      listEn:
        [
          'km', 'day'
        ],
      listUa:
        [
          'км', 'добу'
        ]
    },
  paymentForm: {
    listRu: [
      'наличными', 'безналичными', 'комбинированная', 'карта', 'электронный платёж'
    ],
    listEn:
      [
        'cash', 'non-cash', 'combined', 'card', 'electronic payment'
      ],
    listUa:
      [
        'готівкою', 'безготівкою', 'комбінована', 'карта', 'електронний платіж'
      ]
  },
  paymentTime: {
    listRu: [
      'на загрузке', 'на выгрузке', 'по оригиналам'
    ],
    listEn:
      [
        'on loading', 'unloading', 'by originals'
      ],
    listUa:
      [
        'на завантаженні', 'при розвантаженні', 'за оригіналами'
      ]
  },
  countries: [],
});

export const mutations = {
  setInitialCargo(state, cargo) {
    state.initialCargo = cargo;
  },

  setPropertiesCargo(state, properties) {
    state.propertiesCargo = properties;
  },

  setPlacesCargo(state, places) {
    state.listPlacesCargo = places;
  },

  clearInitialCargo(state) {
    state.initialCargo = {};
    state.propertiesCargo = [];
    state.listPlacesCargo = [];
  },

  addCargoMutation(state, cargo) {
    console.log(cargo);
    state.cargo = [
      ...state.cargo,
      cargo
    ]
  },

  searchCargoMutation(state, cargo) {
    state.cargoAfterSearch = cargo;
    console.log(state.cargoAfterSearch);
  },

  setDataForSearchCargo(state, dataForQuery) {
    state.dataForSearchCargo = dataForQuery.data;
    state.currentPage = dataForQuery.page;
  },

  setCargoView(state, cargoView) {
    state.cargoView = cargoView;
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

  clearCargoAfterSearch(state) {
    state.cargoAfterSearch = [];
  },

  // Следующие два метода используются для сохранения пути, для возврата со странички заявки груза
  setCookieResultSearch(state, resultSearch) {
    this.$cookies.set('resultCargoDataSearch', resultSearch, {maxAge: 100000});
  },

  setResultDataSearch(state) {
    const data = this.$cookies.get('resultCargoDataSearch');

    if (data !== null && data !== undefined) {
      state.resultSearch = data;
      state.pathToSearch = (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
        '/cargo/search-cargo/search';
    } else {
      state.pathToSearch = (this.$i18n.localeProperties.code !== 'ru' ? '/' + this.$i18n.localeProperties.code : '') +
        '/cargo/search-cargo';
    }
  },

  setUserCargo(state, data) {
    state.user = data;
    state.checkUser = state.user.roles.map(item => item.name).includes('ROLE_USER')
  },

  setPointsAllCargo(state, data) {
    state.listPointsAllCargo = data;
  },

  setPointsCargo(state, data) {
    state.listPointsCargo = data;
  },

  setPhotosCargo(state, data) {
    state.listPhotoCargo = data;
  },

  setFilesCargo(state, data) {
    state.listFilesCargo = data;
  },

  checkUserFromOffer(state, data) {
    console.log("CARGO FROM OFFER", data.idCargo);
    data.cargo.map(item => {
      if (item.id === data.idCargo) {
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
  async addCargoAction({commit, state}, store) {
    const response = await this.$axios.post(API_URL + 'add-cargo', store.formData,
      {
        headers: Object.assign(authHeader(store.store), {"Content-Type": undefined}),
        params: {lang: 'ru', token: store.userToken, typeTransportation: store.typeTransportation}
      });
    const data = await response.data;

    console.log("Cargo Action", data);

    if (data) {
      return Promise.resolve();
    }
  },

  async searchCargoAction({commit}, body) {
    const response = await this.$axios.post(API_URL + 'search-cargo', body.data,
      {
        headers: Object.assign(authHeader(body.store)),
        params: {bodyTypeView: body.bodyTypeView, page: body.page, pageSize: body.pageSize}
      });
    const data = await response.data;

    console.log(data);
    if (data) {
      commit('searchCargoMutation', data.cargo);
      commit('setPointsAllCargo', data.pointsLUCargo);
      commit('setCurrentPage', data.currentPage);
      commit('setTotalPages', data.totalPages);
    }
  },

  async getCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-cargo/' + id);
    const data = await response.data;

    if (data) {
      commit('setCargoView', data.cargo);
      commit('setPointsCargo', data.pointsLUCargo);
      commit('setFilesCargo', data.filesCargo);
      commit('setUserCargo', data.user);

      return Promise.resolve(data);
    }
  },

  async getPhotoCargoAction({commit}, id) {
    const response = await this.$axios.get(API_URL + 'get-photos-cargo/' + id);
    const data = await response.data;

    console.log("PHOTO", data);
    if (data) {
      commit('setPhotosCargo', data);
    }
  },

  async checkUserSentOfferAction({commit}, body) {
    /*    let checkUserRole = body.user.roles.map(item => item.name).includes('ROLE_USER');*/

    const response = await this.$axios.get(API_URL + 'get-sent-offers-cargo/' + body.user.id, {
      params: {
        headers: Object.assign(authHeader(body.store))
      }
    });
    const data = await response.data;

    if (data) {
      commit('checkUserFromOffer', {cargo: data, idCargo: body.idCargo});
    }
  },

  async addSeaCargoAction({commit, state}, store) {
    const response = await this.$axios.post(API_URL + 'add-sea-cargo', store.formData,
      {
        headers: Object.assign(authHeader(store.store), {"Content-Type": undefined}),
        params: {lang: 'ru', token: store.userToken}
      });
    const data = await response.data;

    console.log("Cargo Action", data);

    if (data) {
      commit('addCargoMutation', data)
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
  listCargo: state => {
    return state.cargo
  },

  getPlacesCargo: state => {
    return state.listPlacesCargo
  },

  listCargoAfterSearch: state => {
    return state.cargoAfterSearch
  },

  getCargoView: state => {
    return state.cargoView
  },

  getUserFromCargo: state => {
    return state.user
  },

  getCheckUserFromOffer: state => {
    return state.checkUserFromOffer
  },

  checkUser: state => {
    return state.checkUser
  },

  getDataResultSearch: state => {
    return state.resultSearch;
  },

  getPathToSearch: state => {
    return state.pathToSearch
  },

  getPointsAllCargo: state => {
    return state.listPointsAllCargo
  },

  getPointsCargo: state => {
    return state.listPointsCargo
  },

  getPhotoCargo: state => {
    return state.listPhotoCargo
  },

  getFilesCargo: state => {
    return state.listFilesCargo
  },

  getInitialCargo: state => {
    return state.initialCargo;
  },

  getPropertiesCargo: state => {
    return state.propertiesCargo
  },

  getDataForSearchCargo: state => {
    return state.dataForSearchCargo
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

  getTransportation: state => {
    return state.transportation
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

  getLoadingVessel: state => {
    return state.loadingVessel
  },

  getPermission: state => {
    return state.permission
  },

  getIncoterms: state => {
    return state.incoterms
  },

  getPermissionForTrain: state => {
    return state.permissionForTrain
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

  getCountries: state => {
    return state.countries
  }
};
