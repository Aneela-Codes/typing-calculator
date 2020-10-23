const random_quote_api_URL = 'https://api.quotable.io/random'
const quoteDisplay = document.getElementById('displayQuote')
const quoteInput = document.getElementById('quoteInput');
const timer = document.getElementById('timer');
// console.log(quoteDisplay)

quoteInput.addEventListener('input', ()=>{
   const arrayQuote = quoteDisplay.querySelectorAll('span')
   const arrayValue = quoteInput.value.split('');
   let correct = true
   arrayQuote.forEach((characterSpan, index) =>{
    const character  = arrayValue[index]
    if(character == null){
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
    }
     else if(character === characterSpan.innerText){
        characterSpan.classList.add('correct')
        characterSpan.classList.remove('incorrect')
    }
    else{
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
    }
   })
   if(correct){
       getNextQuote()
   }

})
function getRandomQuote(){
 return  fetch (random_quote_api_URL)
    .then(response => response.json())
    .then (data=> data.content)
} 

async function getNextQuote(){
   const quote =  await getRandomQuote()
   quoteDisplay.innerHTML = '' 
 
      quote.split('').forEach(character =>{
       const characterSpan = document.createElement('span')
       characterSpan.innerHTML = character;
       characterSpan
       quoteDisplay.appendChild(characterSpan) 
   })
   quoteInput.value = null
   startTimer()
}
let startTime ;
function startTimer(){
    startTime = new Date();
timer.innerHTML = 0
setInterval(()=>{
   timer.innerHTML =  getTimerTime();
}, 1000)
}
function getTimerTime(){
   return Math.floor((new Date() - startTime)/1000)
}
getNextQuote()