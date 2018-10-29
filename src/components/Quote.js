import React from 'react';
import QuoteItem from './QuoteItem';
class Quotes extends React.Component{

    render(){
        let quoteItem; 
        if (this.props.quote){
            quoteItem = this.props.quote.map(quote => {
                console.log(quote)
                return (<QuoteItem key = {quote.quote} quote ={quote.quote}/>)
            })
        }
        return (
            <div className = "Quotes">
            {quoteItem}
            </div>)
    }
}

export default Quotes;