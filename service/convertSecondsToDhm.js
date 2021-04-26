export class ConvertSecondsToDhm {
    static convert(seconds){
    let d = parseInt(String(seconds / (3600 * 24)));
    let h = parseInt(String(seconds % (3600 * 24) / 3600));
    let m = (seconds % 3600) / 60;


    const dDisplay = d > 0 ? d + " д., " : "";
    const hDisplay = h > 0 ? h + " ч., " : "";
    const mDisplay = m > 0 ? m.toFixed() + " м. " : "";

    return dDisplay + hDisplay + mDisplay;
  }
}
