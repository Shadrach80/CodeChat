import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import  fs  from 'fs';

dotenv.config();

const configuration = new Configuration ({
    organization: "org-trum7pXgFuHnOIgv9G5XPYff",
    apiKey: process.env.OPENAI_API_KEY,
}); 

const openai = new OpenAIApi(Configuration);
const response = await openai.listEngines();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt || "";
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
    });

    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
      };

    res.status(200).send({
        bot: response.data.choices[0].text
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5500, () => console.log('Server is running on port http://localhost:5500'));