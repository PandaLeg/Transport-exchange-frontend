export class parseCargoDate {
  static parseDate(dateFrom, dateBy) {
    let monthFrom;
    let monthBy;
    let dayFrom;
    let dayBy;

    let loadingDateFrom;
    let loadingDateBy;

    const dataSetMonthRu = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
    ];

    const dataSetMonthEn = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа',
      'сентября', 'октября', 'ноября', 'декабря'
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

    switch (monthFrom) {
      case '1':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[0];
        break;
      case '2':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[1];
        break;
      case '3':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[2];
        break;
      case '4':
        loadingDateFrom = dayFrom + ' ' +  dataSetMonthRu[3];
        break;
      case '5':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[4];
        break;
      case '6':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[5];
        break;
      case '7':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[6];
        break;
      case '8':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[7];
        break;
      case '9':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[8];
        break;
      case '10':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[9];
        break;
      case '11':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[10];
        break;
      case '12':
        loadingDateFrom = dayFrom + ' ' + dataSetMonthRu[11];
        break;
    }
    switch (monthBy) {
      case '1':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[0];
        break;
      case '2':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[1];
        break;
      case '3':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[2];
        break;
      case '4':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[3];
        break;
      case '5':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[4];
        break;
      case '6':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[5];
        break;
      case '7':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[6];
        break;
      case '8':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[7];
        break;
      case '9':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[8];
        break;
      case '10':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[9];
        break;
      case '11':
        loadingDateBy = dayBy + ' ' + dataSetMonthRu[10];
        break;
      case '12':
        loadingDateBy = dayFrom + ' ' + dataSetMonthRu[11];
        break;
    }

    return {loadingDateFrom, loadingDateBy};
  }
}
