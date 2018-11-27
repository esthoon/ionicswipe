import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, ItemSliding, Item } from 'ionic-angular';
import { Registrant } from '../../Models/models';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  registrants:Registrant[]=[{
    Id:'A0001',
    Name:'Tan Ah Kow',
    Attendance:false,
  },{
    Id:'A0002',
    Name: 'Linda Lim',
    Attendance:false
  },{
    Id:'A0003',
    Name:'Tan Ah Lian',
    Attendance:false
  }]
  firstCol:string;
  secondCol:string;
  activeItemSliding: ItemSliding = null

  @ViewChild('slidingItem') slidingItem:ItemSliding;


  constructor(public navCtrl: NavController) {
    this.firstCol="REG NO.";
    this.secondCol="PARTICIPANT NAME";
  }

  openOption(item:ItemSliding){
    //console.log(`item sliding open: ${item.getOpenAmount()} percentage:${item.getSlidingPercent()}`)
    
    this.slideOption(item);
    item.startSliding(0);
    item.moveSliding(100);
    item.moveSliding(100);
    /*
    setTimeout(() => {
      item.close();
      this.activeItemSliding=null;
    }, 2000);
    */
  }

  slideOption(item:ItemSliding){
    this.closeOption();
    this.activeItemSliding=item;
  }

  closeOption() {
    console.log('closing item slide..');
    if(this.activeItemSliding!=null){
      this.activeItemSliding.close();
      this.activeItemSliding = null;
    }
   }

   markAttendance(reg:Registrant, item:ItemSliding){
    if(!reg.Attendance){
      reg.Attendance=true;
      console.log('Attendance marked')
    }else{
      console.log('Duplicate: Attendance has been marked but not reflected')
    }
    item.close();
    this.activeItemSliding=null
  }

  undo(reg:Registrant, slidingItem:ItemSliding){
    if(reg.Attendance){
      reg.Attendance=false;
      console.log('Attendance removed');
    }else{
      console.log('Error: No attendance registered for this registrant')
    }
    slidingItem.close();
    this.activeItemSliding=null;
  }

}
