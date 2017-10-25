import React, { Component } from 'react';
import * as d3 from "d3";
import './arc.css';
import {observer} from 'mobx-react';


const ProgressArc = observer(class ProgressArc extends Component {
  displayName: 'ProgressArc';

  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    average: PropTypes.number,
    averageCap: PropTypes.number,
  }

  componentDidMount() {
    this.drawArc();
  }
  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
    this.updatePercent(context);
    this.txt(context);
  }

  redrawArc() {
    const context = d3.select(`#${this.props.id}`);
    context.remove();
    this.drawArc();
  }

  updatePercent(context) {
    return this.setForeground(context).transition()
      .duration(this.props.duration)
      .call(this.arcTween, this.tau * this.props.averageCap, this.arc());
  }

  arcTween(transition, newAngle, arc) {
    transition.attrTween('d', (d) => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      const newArc = d;
      return (t) => {
        newArc.endAngle = interpolate(t);
        return arc(newArc);
      };
    });
  }

  setContext() {
    const { id } = this.props;
    return d3.select(this.refs.arc).append('svg')
      .attr('height', 300)
      .attr('width', 300)
      // .attr('transform', `translate(440,-40)`)
      .attr('id', id)
      .append('g')
      .attr('transform', `translate(150,150)`);
  }
  setBackground(context) {
    const { backgroundColor } = this.props;
    return context.append('path')
      .datum({endAngle: this.tau })
      .style('fill',backgroundColor)
      .attr('d', this.arc())
      .style('opacity','.1');
  }
  setForeground(context) {
    var foreground = context.append('path')
      .datum({ endAngle: 0})
      .style('fill', this.props.foregroundColor)
      .attr('id','path')
      .attr('d', this.arc());
    return foreground;
  }

  tau = Math.PI * 2;
  txt(context) {
    const { average } = this.props;
    var txt = context.append('text')
      .attr('height', 200)
      .attr('width', 400)
      .attr('x', 10 )
      .attr('y',  -60 )
      .style('text-anchor', "middle")
      .style('letter-spacing','.5')
      .style('fill','white')
      .style("font-size", "15px")
      .text(average);

      return txt;
    }
    arc() {
      return d3.arc()
        .innerRadius(this.props.innerRadius)
        .outerRadius(this.props.outerRadius)
        .startAngle(0);
    }



  render() {
    return (
    <div>
      <div ref="arc"></div>
    </div>
    )
  }
});
export default ProgressArc;
