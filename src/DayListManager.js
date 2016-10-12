class DayListManager {
  constructor() {}

  init(){
    let today = new Date();
    log(today.getDay());
  }
}
export default new DayListManager();
