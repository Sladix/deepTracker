class Tracker{
  constructor(ds){
    this.ds = ds;
  }

  click(){
    this.ds.alter('click', 'add', 1);
    if(this.ds.data.click % 100 == 0){
      this.ds.alter('fame', 'add', 1);
    }
  }

  keypressed(msg){
    console.log(msg.payload);
    this.ds.alter('keypressedTotal', 'add', 1);
  }

  tabClosed(){
    this.ds.alter('tabClosed', 'add', 1);
  }

  tabOpened(){
    this.ds.alter('tabOpened', 'add', 1);
  }

  onTabDetached(){
    this.ds.alter('onTabDetached', 'add', 1);
  }
}

// instanciate tracker
let t = new Tracker(dataSource);

Messenger.addListener({
  click: t.click.bind(t),
  keypress: t.keypressed.bind(t)
});
Messenger.onTabRemoved(t.tabClosed.bind(t));
Messenger.onTabOpened(t.tabOpened.bind(t));
Messenger.onTabDetached(t.onTabDetached.bind(t));
