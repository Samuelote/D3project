import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './App.css';
import './DD.css';

const Value = observer(class Value extends Component {
  propTypes: {
    menuActive: Props.Types.bool;
    events: PropsTypes.number,
    bookings: PropTypes.number,
    axisHeight: PropTypes.number,
    bar1: PropTypes.number,
    bar2: PropTypes.number,
    averageCap: PropTypes.number,
    average: PropTypes.number,
    bookingTime: PropsTypes.number,
  }

  value(e){
    console.log(this.props.store.bar1);
  }

  render(){
    const { listOfNames, setCurrentTour, average, bookingTime } = this.props.store;
    return(
    <div>
    <div className='tour-content'>
      <ul> {
      listOfNames.map(el => (
        <div href='#' onClick={() => setCurrentTour(el)} key={el}>{el}</div>
      ))
      }
      </ul>
      </div>
    <h1 onClick = {this.value.bind(this)} className = 'title'>{this.props.store.tourName}</h1>
    <h2 className = 'averageCap'>{average}</h2>
    <h2 className = 'leadTime'>{bookingTime}</h2>
    </div>

    )
  }
});

export default Value