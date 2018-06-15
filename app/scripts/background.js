// Tracker
class DataSource{
  constructor(payload){
    this.load(payload);
  }

  load(payload){
    if(payload && payload.hasOwnProperty('fame')){
      _.assignIn(this.data, _.clone(payload));
    }else if(!payload){
      this.data={
        fame : 0,
        achievments : [],
        events : [],
        opened : 0,
        closed : 0,
        keypressed : {},
        keypressedTotal : 0,
        click : 0,
        copy : 0,
        paste : 0
      }
    }
  }

  getData(){
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
    browser.storage.sync.set(this.data).then(r => console.log(r));
  }
}

class Tracker{
  constructor(ds){
    this.ds = ds;
  }

  click(){
    this.ds.alter('click', 'add', 1);
    console.log(this.ds.getData());
  }
}


let ds = new DataSource();
// Load data from the sync storage
browser.storage.sync.get().then(source => {
  ds.load(source);
  console.log(ds.getData());
});
// instanciate tracker
let tracker = new Tracker(ds);

Messenger.addListener({
  click: tracker.click.bind(tracker),
  getData: ds.getData.bind(ds)
});
