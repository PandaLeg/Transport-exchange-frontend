export class Search {
  static searchLoadingPoint(val, items, loadingPoint, isLoading) {
    let checkFilled = false;

    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (loadingPoint === items[i]) {
          checkFilled = true;
        }
      }
    }

    if (!checkFilled) {
      // Items have already been requested
      if (isLoading) return;

      isLoading = true;

      console.log("FIRST SEARCH", val);
      // Lazily load input items
      fetch('https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=' +
        val + '&lang=ru&rows=50')
        .then(res => res.json())
        .then(res => {
          return res.records;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (isLoading = false))
    }
  }
}
