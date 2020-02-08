import React, {Component} from 'react';
import Card from './Card'; 
import axios from 'axios';


class CardTable extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            deckID: '',
            cardsDrawn: [],
        }
        this.getCard = this.getCard.bind(this);
    }

    componentDidMount() {
        //load data
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(response => {
            this.setState({ deckID: response.data.deck_id })
        })

    }

    getCard() {
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`).then( response => {
            console.log(response.data.cards[0]);
            this.setState(st => ({
                cardsDrawn: st.cardsDrawn.concat({
                    image:response.data.cards[0].image,
                    value: response.data.cards[0].value,
                    suit: response.data.cards[0].suit,
                }),
            }))
        })
        
    }


    render() {

        const cards = this.state.cardsDrawn.map( item => (
            <Card key={item.value+item.suit} image={item.image} alt={`${item.value} of ${item.suit}`}/> 
        ))

        return (
           <div>
               <section className='CardTable-upper'>
                    {cards}
               </section>
                <section className='CardTable-lower'>
                    <p>Hand Total: {}</p>
                    <button onClick={this.getCard}>Hit Me!</button>
                </section>
           </div>
        )
    }

}

export default CardTable; 