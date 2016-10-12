class DayListManager {
  constructor() {}
  init(){
    this.today = new Date();
    this.month = this.today.getMonth() + 1 ;
    this.day = this.today.getDate();
    return this.month == 10 ? this.day : 30;
  }
  scroll(){

  }
}
export default new DayListManager();
