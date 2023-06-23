import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');
// const moreInfoButton = document.getElementById('button1');
// moreInfoButton.addEventListener('click', fetchMoreInformation);


// function fetchMoreInformation() {

//   const flag = 1;
//   console.log("WORKING")
//   const prompt = 'CAPITAL OF INDIA';

//   fetch('http://localhost:5500/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ prompt }),
//   })
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response from the server
//     console.log(data);
//   })
//   .catch(error => {
//     console.error(error);
//   });



  // // Make an API request to retrieve more information using the searchedTopic
  // fetch('http://localhost:5500', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ topic: `Capital of India`}),//each and every detail (like name, DOB, nationality, education, career, notable work, family, awards, plot, actors, director,producer,studio,release date,genre,rating,runtime, budget, performance at box office, theme song, true story or based on something or fictional, sequels or prequels, OTT platform or streaming places) in JSON format but display only in user readable format.` }),
  // })
  // .then(response => response.json())
  // .then(data => {
  //   // Handle the response from the server
  //   console.log(data); // Process the data or update the UI with the additional information
  // })
  // .catch(error => {
  //   console.error(error);
  // });
// }

// const btn = document.getElementById('button1');

// btn.addEventListener('click', () => {
//   const requestedThing = document.getElementById('button1').value;

  

const btn = document.getElementById('button1');
btn.addEventListener('click', () => {
  // Make an HTTP request to the server-side endpoint
  fetch('http://localhost:5500/update-variable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ buttonPressed: true }) // Set the value to true when the button is pressed
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
     .catch(error => {
      console.error('Error:', error);
    });
});

// To retrieve the current value of the buttonPressed variable

fetch('http://localhost:5500/variable-value')
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server
    const buttonPressed = data.buttonPressed;
    console.log('Button Pressed:', buttonPressed);
  })
  .catch(error => {
    console.error('Error:', error);
  });
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
  try{
  const data = await response.json();
  console.log(data);
  if(data.bot)
  {const parsedDta = data.bot.trim();
  typeText(messageDiv,parsedDta)
 }
 else {
  throw new Error('Invalid server response');
}
} catch (error) {
console.error(error);
messageDiv.innerHTML = 'Something went wrong, try again later';
}
 }
else {
  const errorMessage = await response.text();
  messageDiv.innerHTML = 'Something went wrong, try again later';
  alert(errorMessage);
}
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});



