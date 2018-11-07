import formula from './formula';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import'../../Dashboard.css'
export default class FormulaChart extends React.Component{

  render() {
    const formulaLabels = formula.map(formula => formula.Category);
    const formulaData = formula.map(formula => (formula.Percent*this.props.income/100/12).toFixed(2));

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
    return (
      <div className='doughnut'>
        <h2>Recommended Spending</h2>
        <hr/>
        <Doughnut data={data} />
      </div>
    );
  }
}