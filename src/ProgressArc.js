import React, { Component } from 'react';
import * as d3 from "d3";



class ProgressArc extends Component {
  displayName: 'ProgressArc';

  propTypes: {
    id: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
    averageCap: PropTypes.number
  }

  componentDidMount() {
    this.drawArc();
    // console.log(d3.select(`#${this.props.id}`);
  }
  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
    this.labels(context);
    this.updatePercent(context);
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
      .attr('transform', `translate(450,-1000)`)
      .attr('id', id)
      .append('g')
      .attr('transform', `translate(150,150)`);
  }
  labels(context){
    const text = context.append('path')
        .attr('id','tpath');
    text.append('textPath')
      .attr("xlink:href","#tpath")
      .text("My counter text");
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

  arc() {
    return d3.arc()
      .innerRadius(this.props.innerRadius)
      .outerRadius(this.props.outerRadius)
      .startAngle(0);
  }
  render() {
    return (
      <div ref="arc"></div>

    )
  }
}
export default ProgressArc;
