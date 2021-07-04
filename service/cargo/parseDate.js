export class parseCargoDate {
  static parseDate(dateFrom, dateBy, codeLang) {
    const dataSetMonthRu = [
      {id: 1, name: 'января'}, {id: 2, name: 'февраля'}, {id: 3, name: 'марта'}, {id: 4, name: 'апреля'},
      {id: 5, name: 'мая'}, {id: 6, name: 'июня'}, {id: 7, name: 'июля'}, {id: 8, name: 'августа'},
      {id: 9, name: 'сентября'}, {id: 10, name: 'октября'}, {id: 11, name: 'ноября'}, {id: 12, name: 'декабря'}
    ];

    const dataSetMonthEn = [
      {id: 1, name: 'January'}, {id: 2, name: 'February'}, {id: 3, name: 'March'}, {id: 4, name: 'April'},
      {id: 5, name: 'May'}, {id: 6, name: 'June'}, {id: 7, name: 'Jule'}, {id: 8, name: 'August'},
      {id: 9, name: 'September'}, {id: 10, name: 'October'}, {id: 11, name: 'November'}, {id: 12, name: 'December'}
    ];

    const dataSetMonthUa = [
      {id: 1, name: 'січня'}, {id: 2, name: 'лютого'}, {id: 3, name: 'березня'}, {id: 4, name: 'квітня'},
      {id: 5, name: 'травня'}, {id: 6, name: 'червня'}, {id: 7, name: 'липня'}, {id: 8, name: 'серпня'},
      {id: 9, name: 'вересня'}, {id: 10, name: 'жовтня'}, {id: 11, name: 'листопада'}, {id: 12, name: 'грудня'}
    ];

    if (dateFrom !== null && dateBy !== null) {
      let monthFrom;
      let monthBy;
      let dayFrom;
      let dayBy;

      let loadingDateFrom = null;
      let loadingDateBy = null;

      if (dateFrom.charAt(5) === '0') {
        monthFrom = dateFrom.substring(6, 7);
      } else {
        monthFrom = dateFrom.substring(5, 7);
      }

      if (dateBy.charAt(5) === '0') {
        monthBy = dateBy.substring(6, 7);
      } else {
        monthBy = dateBy.substring(5, 7);
      }

      if (dateFrom.charAt(8) === '0') {
        dayFrom = dateFrom.substring(9, 10);
      } else {
        dayFrom = dateFrom.substring(8, 10);
      }

      if (dateBy.charAt(8) === '0') {
        dayBy = dateBy.substring(9, 10);
      } else {
        dayBy = dateBy.substring(8, 10);
      }

      if (codeLang === 'en') {
        return this.setLoadingDateFromAndDateBy(loadingDateFrom, loadingDateBy, monthFrom, monthBy, dayFrom, dayBy, dataSetMonthEn)
      } else if (codeLang === 'ua') {
        return this.setLoadingDateFromAndDateBy(loadingDateFrom, loadingDateBy, monthFrom, monthBy, dayFrom, dayBy, dataSetMonthUa)
      } else {
        return this.setLoadingDateFromAndDateBy(loadingDateFrom, loadingDateBy, monthFrom, monthBy, dayFrom, dayBy, dataSetMonthRu)
      }
    } else {
      let month;
      let day;
      let dateCreated = null;


      if (dateFrom.charAt(5) === '0') {
        month = dateFrom.substring(6, 7);
      } else {
        month = dateFrom.substring(5, 7);
      }

      if (dateFrom.charAt(8) === '0') {
        day = dateFrom.substring(9, 10);
      } else {
        day = dateFrom.substring(8, 10);
      }

      if (codeLang === 'en') {
        return this.setLoadingCreationDate(dateCreated, month, day, dataSetMonthEn)
      } else if (codeLang === 'ua') {
        return this.setLoadingCreationDate(dateCreated, month, day, dataSetMonthUa)
      } else {
        return this.setLoadingCreationDate(dateCreated, month, day, dataSetMonthRu)
      }
    }
  }

  static setLoadingDateFromAndDateBy(loadingDateFrom, loadingDateBy, monthFrom, monthBy, dayFrom, dayBy, months) {
    loadingDateFrom = dayFrom + ' ' + months.find(i => i.id === Number(monthFrom)).name;
    loadingDateBy = dayBy + ' ' + months.find(i => i.id === Number(monthBy)).name;

    return {loadingDateFrom, loadingDateBy};
  }

  static setLoadingCreationDate(dateCreated, month, day, months) {
    dateCreated = day + ' ' + months.find(i => i.id === Number(month)).name;

    return dateCreated;
  }
}
