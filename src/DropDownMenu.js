import React, { Component } from 'react';
import {observer} from 'mobx-react';
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
    </div>


    )
  }
});

export default Value
