import formula from './formula';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import React , {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';


const formulaLabels = formula.map(formula => formula.Category);
const formulaData = formula.map(formula => formula.Percent)

const data = {
	labels: formulaLabels,
	datasets: [{
    data: formulaData,
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]

	}]
};
console.log(formulaData)

export default class FormulaChart extends React.Component{

  render() {
    return (
      <div>
        <h2>Recommended Spending</h2>
        <Doughnut data={data} />
      </div>
    );
  }
}