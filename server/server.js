import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});



const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello-trial message'

  })
})
let buttonPressed = false;
const prompt = null;

app.post('/', async (req, res) => {
  try {
    
const x = "get all the possible information related in user readable format along with certain information on the most searched topics on it";

// const btn = document.getElementById('button1');

// btn.addEventListener('click', () => {
//   buttonPressed = true;
//   console.log('Button pressed');
//const y = "Get certain details (like name, DOB, nationality, education, career, notable work, family, awards, plot, actors, director,producer,studio,release date,genre,rating,runtime, budget, performance at box office, theme song, true story or based on something or fictional, sequels or prequels, OTT platform or streaming places) in JSON format but display in user readable format.";
    //const prompt = buttonPressed ? `India's capital` : `UAE's capital`;

    const prompt = req.body.prompt + `${x}`;
    //const prompt = req.body.prompt + `display the JSON format received response in user interpretable.`//`Get each and every detail (like name, DOB, nationality, education, career, notable work, family, awards, plot, actors, director,producer,studio,release date,genre,rating,runtime, budget, performance at box office, theme song, true story or based on something or fictional, sequels or prequels, OTT platform or streaming places) + `in JSON format but display in user readable format.`
    
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, 
      max_tokens: 4000, 
      top_p: 1,
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
      //format : "json",
    });

    res.status(200).send({
     bot: response.data.choices[0].text
     // bot: response.data.json.parse(choices[0])
    });
    //console.log(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5500, () => console.log('AI server started on http://localhost:5500'))