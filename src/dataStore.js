import { action, extendObservable, computed } from 'mobx'
import MainObj from './Data.js';


export class dataStore {
  constructor(){
    extendObservable(this, {
      tourName: "Broadway Public Sunday-Wednesday Tour",
      listOfNames: Object.keys(MainObj),
      setCurrentTour: action((name) => this.tourName = name),
      currentTour: computed(() => MainObj[this.tourName]),
      bookingTime: computed(() => {
        const final = Math.round(Math.round((100*this.currentTour['Summary Statistics']['Booking Lead Time']))/100);
        if (isNaN(this.currentTour['Summary Statistics']['Booking Lead Time']) === true){
          return ('No Bookings Lead Time Data Available');
        }
        else{
          return 'Booking Lead Time: '+final+' Days';
        }}),
      averageCap: computed(() => this.currentTour['Summary Statistics']['Average Capacity']),
      bookings: computed(() => this.currentTour['Summary Statistics']['Total Bookings']),
      events: computed(() => this.currentTour['Summary Statistics']['Total Events']),
      axisHeight: computed(() => {
        if (this.bookings > this.events || this.events === undefined){
          if (this.bookings >= 10000 && this.bookings <=20000){
            return 20000
          }
          else if (this.bookings >= 1500){
            return (Math.round(this.bookings/1000)*1000)+1000;
          }
          else if (this.bookings > 100){
            return (Math.floor(this.bookings/100)*100)+100;
          }
          else if (this.bookings > 10 && this.bookings <= 100){
            return 100;
          }
          else if(this.bookings <= 10){
            return 10;
          }
          else {
            return "No Value";
          }
        }
        else{

          if (this.events >= 10000 && this.events <=20000){
            return 20000;
          }
          else if (this.events >= 1500){
            return (Math.round(this.events/1000)*1000)+1000;
          }
          else if (this.events > 100){
            return (Math.floor(this.events/100)*100)+100;
          }
          else if (this.events > 10 && this.events <= 100){
            return 100;
          }
          else if(this.events <= 10){
            return 10;
          }
          else {
            return "No Value";
          }
        }
      }),
      bar1: computed(() => {
        const possibleHeight = 295;
        return (possibleHeight*this.bookings)/this.axisHeight;
      }),
      bar2: computed(() => {
        const possibleHeight = 295;
        return (possibleHeight*this.events)/this.axisHeight;
      }),
      average: computed(() => {
        const final = Math.round((this.averageCap*100)*100)/100;
        if (isNaN(this.averageCap)){
          return 'No Data Available';
        }
        else {
          return 'Average Capacity: '+final+'%';
        }
        // else if
        // if (this.averageCap.length >= 2){
        //   return final;
        // }
      })
    });
  }
}

export default new dataStore();
