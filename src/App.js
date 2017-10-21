import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './App.css';
import ProgressArc from './ProgressArc';
import BarChart from './BarChart.js';
import Value from './DropDownMenu';



const App = observer(class App extends Component {

  render() {
    return(
      <div>
      < Value
        menuActive = { this.props.store.menuActive }
        store = {this.props.store}
        className = 'val'/>

        < BarChart
          events = { this.props.store.events }
          bookings = { this.props.store.bookings }
          axisHeight = { this.props.store.axisHeight }
          bar1 = { this.props.store.bar1 }
          bar2 = { this.props.store.bar2 }
          store = { this.props.store }/>

          < ProgressArc
              innerRadius={0}
              outerRadius={150}
              id="d3-arc"
              backgroundColor="#e6e6e6"
              foregroundColor="#f29d35"
              averageCap={this.props.store.averageCap}
              average={this.props.store.average}
              duration={1300}
          />
      </div>
    );
  }
});

export default App;
