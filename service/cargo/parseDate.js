export class parseCargoDate {
  static parseDate(dateFrom, dateBy, codeLang) {
    let monthFrom;
    let monthBy;
    let dayFrom;
    let dayBy;

    let loadingDateFrom = null;
    let loadingDateBy = null;

    const dataSetMonthRu = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
    ];

    const dataSetMonthEn = [
      'January', 'February', 'March', 'April', 'May', 'June', 'Jule', 'August',
      'September', 'October', 'November', 'December'
    ];

    const dataSetMonthUa = [
      'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня',
      'вересня', 'жовтня', 'листопада', 'грудня'
    ];

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
  }

  static setLoadingDateFromAndDateBy(loadingDateFrom, loadingDateBy, monthFrom, monthBy, dayFrom, dayBy, months) {
    switch (monthFrom) {
      case '1':
        loadingDateFrom = dayFrom + ' ' + months[0];
        break;
      case '2':
        loadingDateFrom = dayFrom + ' ' + months[1];
        break;
      case '3':
        loadingDateFrom = dayFrom + ' ' + months[2];
        break;
      case '4':
        loadingDateFrom = dayFrom + ' ' + months[3];
        break;
      case '5':
        loadingDateFrom = dayFrom + ' ' + months[4];
        break;
      case '6':
        loadingDateFrom = dayFrom + ' ' + months[5];
        break;
      case '7':
        loadingDateFrom = dayFrom + ' ' + months[6];
        break;
      case '8':
        loadingDateFrom = dayFrom + ' ' + months[7];
        break;
      case '9':
        loadingDateFrom = dayFrom + ' ' + months[8];
        break;
      case '10':
        loadingDateFrom = dayFrom + ' ' + months[9];
        break;
      case '11':
        loadingDateFrom = dayFrom + ' ' + months[10];
        break;
      case '12':
        loadingDateFrom = dayFrom + ' ' + months[11];
        break;
    }
    switch (monthBy) {
      case '1':
        loadingDateBy = dayBy + ' ' + months[0];
        break;
      case '2':
        loadingDateBy = dayBy + ' ' + months[1];
        break;
      case '3':
        loadingDateBy = dayBy + ' ' + months[2];
        break;
      case '4':
        loadingDateBy = dayBy + ' ' + months[3];
        break;
      case '5':
        loadingDateBy = dayBy + ' ' + months[4];
        break;
      case '6':
        loadingDateBy = dayBy + ' ' + months[5];
        break;
      case '7':
        loadingDateBy = dayBy + ' ' + months[6];
        break;
      case '8':
        loadingDateBy = dayBy + ' ' + months[7];
        break;
      case '9':
        loadingDateBy = dayBy + ' ' + months[8];
        break;
      case '10':
        loadingDateBy = dayBy + ' ' + months[9];
        break;
      case '11':
        loadingDateBy = dayBy + ' ' + months[10];
        break;
      case '12':
        loadingDateBy = dayFrom + ' ' + months[11];
        break;
    }

    return {loadingDateFrom, loadingDateBy};
  }
}
