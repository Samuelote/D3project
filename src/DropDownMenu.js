import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './DD.css';

//arbitrary comment to test herokus

const Value = observer(class Value extends Component {
  propTypes: {
    menuActive: Props.Types.bool;
    events: PropsTypes.number,
    bookings: PropTypes.number,
    axisHeight: PropTypes.number,
    bar1: PropTypes.number,
    bar2: PropTypes.number,
    averageCap: PropTypes.number,
    bookingTime: PropsTypes.number,
  }

  render(){
    const { listOfNames, setCurrentTour, bookingTime, tourName } = this.props.store;
    return(
    <div>
    <div className = 'container'>
    <div className='tour-content'>
      <ul> {
      listOfNames.map(el => (
        <div href='#' onClick={() => setCurrentTour(el)} key={el}>{el}</div>
      ))
      }
      </ul>
      </div>
      </div>
    <h1 className = 'title'>{tourName}</h1>
    <h2 className = 'leadTime'>{bookingTime}</h2>
    </div>


    )
  }
});

export default Value
