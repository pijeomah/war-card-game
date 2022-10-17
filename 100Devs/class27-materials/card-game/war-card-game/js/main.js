//Example fetch using pokemonapi.co

//the first step is to assign an empty string to the variable deckId
let deckId =' '
//Using the fetch template we want to get a deck id on pageload
//we assign the id we get from the api to the deckId

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
    //set local storage inorder to play from the same deck across browser sessions
localStorage.setItem('Deck Identity', deckId)
      
// create an event listener
document.querySelector('button').addEventListener('click', dealCard)


function dealCard(){
  //we retrieve the draw card url and assign it to the url variable also input deckId into the 
  //twmplate literal inorder to draw cards from that particular deck
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        //display the image of the cards
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let play1 = convertFaceCard(data.cards[0].value)
        let play2 = convertFaceCard(data.cards[1].value)
        if(play1 > play2){
          document.querySelector('h3').innerText = 'Player 1 Wins'
        }else if(play1 < play2){
          document.querySelector('h3').innerText = 'Player 2 Wins'
        }else{'We go to war'}
        //get the value of the cards from the array and then compare the cards based on which card is of 
        //greater value and return the winner to the DOM
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
      
//create a helper function that takes care of the edge cases involving worded cards

function convertFaceCard(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
      return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{return Number(val)}
}


