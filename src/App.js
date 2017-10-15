import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './App.css';
import ProgressArc from './ProgressArc';
import BarChart from './BarChart.js';
import Value from './DropDownMenu';



const App = observer(class App extends Component {

  render() {
    const { averageCap } = this.props.store;
    return(
      <div>
        < Value
          menuActive = { this.props.store.menuActive }
          store = {this.props.store} />
        < BarChart
          events = { this.props.store.events }
          bookings = { this.props.store.bookings }
          axisHeight = { this.props.store.axisHeight }
          bar1 = { this.props.store.bar1 }
          bar2 = { this.props.store.bar2 }
          store = { this.props.store }/>
          < ProgressArc
              height={300}
              width={300}
              innerRadius={90}
              outerRadius={120}
              id="d3-arc"
              backgroundColor="#e6e6e6"
              foregroundColor="#f29d35"
              averageCap={averageCap}
              duration={2000}
          />
      </div>
    );
  }
});

export default App;
