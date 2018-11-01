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

  openOption(item:ItemSliding, thisItem: Item){
    console.log(`item sliding open: ${item.getOpenAmount()} percentage:${item.getSlidingPercent()}`)
    if(this.activeItemSliding!==null){
      this.closeOption(item, thisItem); 
    }
    this.activeItemSliding = item;
    this.drawSwipeCss(true, item, thisItem);
  }

  closeOption(item: ItemSliding, thisItem: Item) {
    console.log('closing item slide..');
    item.close();
    this.drawSwipeCss(false, item, thisItem);
   }

   markAttendance(reg:Registrant, item:ItemSliding, thisItem: Item){
    if(!reg.Attendance){
      reg.Attendance=true;
      console.log('Attendance marked')
    }else{
      console.log('Duplicate: Attendance has been marked but not reflected')
    }
    item.close();
    this.drawSwipeCss(false, item, thisItem);
  }

  undo(reg:Registrant, slidingItem:ItemSliding, thisItem: Item){
    if(reg.Attendance){
      reg.Attendance=false;
      console.log('Attendance removed');
    }else{
      console.log('Error: No attendance registered for this registrant')
    }
    slidingItem.close();
    this.drawSwipeCss(false, slidingItem, thisItem);
  }

  drawSwipeCss(open: boolean, item:ItemSliding, thisItem: Item){
    item.setElementClass("active-sliding", open);
    item.setElementClass("active-slide", open);
    item.setElementClass("active-options-left", open);
    var openWidth = "";
    openWidth = open ? "100" : "0";
    thisItem.setElementStyle("transform", "translate3d(" + openWidth + "px, 0px, 0px)");
    if(!open) this.activeItemSliding = null;
  }

}
