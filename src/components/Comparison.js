import formula from './Formula/formula';
import React from 'react';
import {Bar} from 'react-chartjs-2';
// import * as MyAPI from '../utils/MyAPI';



export default class Comparison extends React.Component{

  /*state = {
    income: 0
  }
  */
  
  /*componentWillMount(){
    MyAPI.getIncome()
      .then((data) =>{
        let info = JSON.stringify(data)
        let userIncome = info['income']
        this.setState ({ income: userIncome})
      })
      .catch((err) => {
        console.log("err:", err)
      })
    } */ 

  render() {
    const formulaLabels = formula.map(formula => formula.Category);
    const formulaData = formula.map(formula => (formula.Percent*this.props.income/100/12).toFixed(2));
    let housing = this.props.housing;
    let utilities = this.props.utilities;
    let transportation = this.props.transportation;
    let food = this.props.food;
    let entertainment = this.props.entertainment;
    let debt = this.props.debt;
    let personal= this.props.personal;
    let savings = this.props.savings;
    const data = {
      labels: formulaLabels,
      datasets: [
        {
        label: "Recommended Spending",
        data: formulaData,
        backgroundColor: 'green',        

      }, 
      {
        label: "Your Current Spending",
        data: [housing, utilities, transportation, food, entertainment, personal, savings, debt],
        backgroundColor: 'blue',
      }]
    };
    return (
      <div>
        <h2>Comparison</h2>
        <Bar data={data} />
      </div>
    );
  }
}

 
  