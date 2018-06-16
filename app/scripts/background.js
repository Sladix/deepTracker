// Tracker
class DataSource{
  constructor(payload){
    this.load(payload);
  }

  getDefaults = function(){
    return {
      fame : 0,
      achievments : [],
      events : [],
      tabOpened : 0,
      tabClosed : 0,
      keypressed : {},
      keypressedTotal : 0,
      onTabDetached: 0,
      click : 0,
      copy : 0,
      paste : 0
    }
  }

  load(payload){
    if(payload && payload.hasOwnProperty('fame')){
      _.assignIn(this.data, _.clone(payload));
    }else if(!payload){
      this.data = this.getDefaults();
    }
  }

  getData(){
    return this.data;
  }

  whipe(){
    this.data = this.getDefaults();
    browser.storage.sync.clear();
    browser.storage.sync.set(this.data);
    return this.data;
  }
  // op: string - add, sub, ass
  alter(prop, op, value){
    switch (op) {
      case 'add':
          this.data[prop] += value;
        break;
      case 'sub':
          this.data[prop] -= value;
        break;
      default:
        this.data[prop] = value;
    }
    browser.storage.sync.set(this.data);
  }
}

let ds = new DataSource();
// Load data from the sync storage
browser.storage.sync.get().then(source => {
  ds.load(source);
  console.log(ds.getData());
});

dataSource = ds;

Messenger.addListener({
  getData: ds.getData.bind(ds),
  whipe: ds.whipe.bind(ds)
});
