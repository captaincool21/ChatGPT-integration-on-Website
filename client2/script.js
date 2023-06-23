import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

function myFunction() {
  //window.location.href = "http://localhost:5175/";
  let text;
let person = prompt("Please enter your name:", "Harry Potter");
if (person == null || person == "") {
text = "User cancelled the prompt.";
} else {
text = "Hello " + person + "! How are you today?";
}
document.getElementById("demo").innerHTML = text;
}

//Below function for making the loading feel in the bot
let loadinterval;

function loader(element) {
  element.textContent = '';
  loadinterval = setInterval(() => {
    element.textContent += '.';
   
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}
//Function to get the typing like feeling 
function typeText(element, text){
  let index = 0

  let interval = setInterval(() => {
    if(index<text.length) {
      element.innerHTML += text.charAt(index)
      index++

    }else{
      clearInterval(interval)
    }
  }, 20)
}
function generateUniqueID() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStrip(isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi ? 'ai' : ''}">
      <div class="chat">
        <div class="profile">
          <img 
            src="${isAi ? bot : user}" 
            alt="${isAi ? 'bot' : 'user'}" 
          />
        </div>
        <div class="message"id=${uniqueId}>${value}</div>
      </div>
    </div>
  `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  chatContainer.innerHTML += chatStrip(false, data.get('prompt'))
  //chatContainer.inne
  form.reset();

  const uniqueId = generateUniqueID()
  chatContainer.innerHTML += chatStrip(true, ' ', uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

 const response = await fetch('http://localhost:5500', {
  method:'POST',
  headers: {
    'Content-Type': 'application/json'

  },
  body: JSON.stringify({
    prompt: data.get('prompt')
  })
 })
 
 clearInterval(loadinterval);
 messageDiv.innerHTML = " ";

 if(response.ok){
  const data = await response.json();
  console.log(data);
  const parsedDta = data.bot.trim();
  typeText(messageDiv,parsedDta)
 }
 else{
  const err = await response.text();
  messageDiv.innerHTML = "Something went wrong, try again later";
  alert(err)
 }

}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});





// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from '.script.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
