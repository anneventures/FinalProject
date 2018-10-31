import formula from './formula';
import React , {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';



const formulaLabels = formula.map(formula => formula.Category);
const formulaData = formula.map(formula => (formula.Percent*40000/100/12).toFixed(2));
const incomeData = formulaData.map(income=> (formulaData*income))

const data = {
	labels: formulaLabels,
	datasets: [{
    data: formulaData,
    backgroundColor: [
      'red',
      'grey',
      'orange',
      'blue',
      'yellow',
      'lightgreen',
      'purple',
      'magenta',
      'cyan'
      ],
      hoverBackgroundColor: [
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