import React, { Component } from 'react';
import * as d3 from "d3";
import {observer} from 'mobx-react';


const BarChart = observer(class BarChart extends Component {
  displayName: 'Bar Chart';


  propTypes: {
    events: PropsTypes.number,
    bookings: PropTypes.number,
    axisHeight: PropTypes.number,
    bar1: PropTypes.number,
    bar2: PropTypes.number,
  }
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate(){
    this.redraw();
  }
  draw(){
    const context = this.setContext();
    this.drawAxis(context);
    this.drawBars().transition()
      .duration(1000);
    this.labels(context);
  }
  redraw(){
    const context = d3.select(`#mainSvg`);
    const bars = d3.select(`#bars`);
    context.remove();
    bars.remove();
    this.draw();
  }
  setContext() {                //sets the frame for the axes
    return d3.select(this.refs.main).append('svg')
      .style('position','absolute')
      .attr('transform', `translate(20,-200)`)
      .attr('height', 650)
      .attr('width', 337)
      .attr('id', 'mainSvg')
    }
  drawAxis(context) {
    const {axisHeight} = this.props;
    const tickLabels = ['',"Bookings", "Events",''];
    return context.append('g')
        .attr('id', 'axis')
        .style('stroke-width', '4')
        .attr('transform', `translate(100, 250)`)
        .call(d3.axisLeft(d3.scaleLinear().domain([axisHeight, 0]).range([0, 300])).tickSize(20).ticks(10))
        .append('g')
        .attr('transform', `translate(0, 300)`)
        .call(d3.axisBottom(d3.scaleLinear().range([0, 400]))
        .ticks(4)
        .tickSize(20)
        .tickPadding(4)
        .tickFormat(function(d,i){ return tickLabels[i] }));
    }
  drawBars() {              //sets up the bars
    const {bar1, bar2, bookings, events} = this.props;
    const bar = d3.select(this.refs.bar).append('svg')
      .style('position','absolute')
      .attr("class", "test")
      .attr('id', 'bars')
      .attr('height', 300)
      .attr('width', 130)
      .attr('transform', `translate(181,48)`)
      .append('g');
    bar.append('rect')
        .attr('height', bar1).attr('width', 40)
        .style('fill','#f29d35')
        .attr('transform', `translate(40,300)rotate(-180)`);
    bar.append('rect')
      .attr('height', bar2).attr('width', 40)
      .style('fill','#f29d35')
      .attr('transform', `translate(120,300)rotate(-180)`);
    bar.append('svg')
      .attr('height', 1000)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',9)
      .style('fill','black')
      .style("font-size", "15")
      .style('font-weight','bolder')
      .text(bookings)
      .attr('transform',`translate(-75,230)rotate(-90)`);
    bar.append('svg')
      .attr('height', 400)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',9)
      .style('fill','black')
      .style("font-size", 15)
      .style('font-weight','bolder')
      .text(events)
      .attr('transform',`translate(0,230)rotate(-90)`);
      return bar;
  }
  labels(context){          //basic labels for the chart
    const { bookings, events } = this.props;
    context.append('svg')
      .attr('id', 'labels')
      .attr('height', 200)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',1)
      .style('fill','white')
      .style("font-size", "23px")
      .text("Bookings And Events")
      .attr('transform', `translate(65,90)`);
    context.append('svg')
      .attr('height', 1000)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',10)
      .style('fill','white')
      .style("font-size", "15px")
      .text("TOTAL AMOUNT")
      .attr('transform', `translate(-60,545)rotate(-90)`);
    context.append('svg')
      .attr('height', 1000)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',10)
      .style('fill','white')
      .style("font-size", "15")
      .text("TYPE")
      .attr('transform', `translate(70,515)`);
    if (bookings === undefined){
      context.append('svg')
      .attr('height', 1000)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',2)
      .style('fill','white')
      .style("font-size", "12")
      .text("No Bookings Data Available")
      .attr('transform',`translate(87,570)rotate(-90)`);
    }
    if (events === undefined){
      context.append('svg')
      .attr('height', 1000)
      .attr('width', 400)
      .append('text')
      .classed('title', true)
      .attr('x', 150 )
      .attr('y',  100 )
      .style('text-anchor', "middle")
      .style('letter-spacing',2)
      .style('fill','white')
      .style("font-size", "12")
      .text("No Events Data Available")
      .attr('transform',`translate(165,570)rotate(-90)`);

    }

  }

  render() {
    return (
      <div className = 'barChart'>
      <div ref="main"></div>
      <div ref='bar'></div>
      </div>
    )
  }
});



export default BarChart;
