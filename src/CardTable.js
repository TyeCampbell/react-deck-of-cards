import React, {Component} from 'react';
import Card from './Card'; 
import axios from 'axios';


class CardTable extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            deckID: '',
            cardsDrawn: [],
            handTotal: 0,
        }
        this.getCard = this.getCard.bind(this);
        this.drawHand = this.drawHand.bind(this);
        this.holdCards = this.holdCards.bind(this);
    }

    componentDidMount() {
        //load data
        axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(response => {
            this.setState({ deckID: response.data.deck_id })
        })

    }

    getCard() {
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`).then( response => {
           
            this.setState(st => ({
                cardsDrawn: st.cardsDrawn.concat({
                    image:response.data.cards[0].image,
                    value: response.data.cards[0].value,
                    suit: response.data.cards[0].suit,
                }),
            }), () => this.handTotal())
        })      
    }

    // draw two cards
    drawHand() {
        this.getCard();
        setTimeout(this.getCard, 500)
    }

    handTotal() {
        let total = 0; 

        this.state.cardsDrawn.forEach(element => {
            
            console.log("Hand total before conditional: " + this.state.handTotal)
            console.log("Is this an ace? " + element.value === "ACE")

            if (element.value === "KING") {
                total += 10;
            } else if (element.value === "QUEEN") {
                total += 10;
            } else if (element.value === "JACK") {
                total += 10;
            } else if ( element.value === "ACE") {
                if (this.state.handTotal + 11 > 21) {
                    total += 1;
                } else {
                    total += 11
                }    
            } else {
                total += parseInt(element.value);
            }
        })
        //return total;
        this.setState({handTotal: total})

        console.log("Hand total after conditional & setState: " + this.state.handTotal)

    }

    holdCards() {
        this.setState({cardsDrawn: [], handTotal: 0});
    }

    render() {

        const cards = this.state.cardsDrawn.map( item => (
            <Card key={item.value+item.suit} image={item.image} alt={`${item.value} of ${item.suit}`}/> 
        ))

        let gameStatus = ""

        if (this.state.handTotal === 21) {
            gameStatus = "21! You win!"
        }

        if (this.state.handTotal > 21) {
            gameStatus = "BUST! You lose!"
        }

        return (
           <div>
               <section className='CardTable-upper'>
                <p className='CardTable-lose'>{gameStatus}</p>
                    {cards}
               </section>
                <section className='CardTable-lower'>
                    <p>Hand Total: {this.state.handTotal}</p>
                    <button disabled={this.state.handTotal > 21 || this.state.handTotal === 21}onClick={this.state.handTotal === 0 ? this.drawHand : this.getCard}>{this.state.handTotal === 0 ? "Draw Hand" : "Hit Me!"}</button>
                    {/* <button disabled={this.state.handTotal > 21 || this.state.handTotal === 21} onClick={this.getCard}>Hit Me!</button> */}
                    <button onClick={this.holdCards}>Hold</button>
                </section>
           </div>
        )
    }

}

export default CardTable; 