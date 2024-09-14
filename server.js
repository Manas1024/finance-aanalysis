const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const apiKey = 'H1zy9eR09FDO1voEjhNJEdvbQkUST1XM';
const externalUserId = 'xyzabcdsssss';

app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'
app.use(express.json());

app.post('/api/query', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Step 1: Create Chat Session
    const sessionResponse = await axios.post(
      'https://api.on-demand.io/chat/v1/sessions',
      { pluginIds: [], externalUserId },
      { headers: { apikey: apiKey } }
    );

    const sessionId = sessionResponse.data.data.id;

    // Step 2: Submit Query
    const queryResponse = await axios.post(
      `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
      {
        endpointId: 'predefined-openai-gpt4o',
        query,
        pluginIds: ['plugin-1726253762'], // Use the plugin ID you created
        responseMode: 'sync'
      },
      { headers: { apikey: apiKey } }
    );

    res.json(queryResponse.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
