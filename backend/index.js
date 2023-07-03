const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {

        const r = await axios.put(
            "https://api.chatengine.io/users/",
            {
                username: username,
                secret: username,
                firstname: username,
            },
            {
                headers: {
                    "private-key": "08c773cd-e28c-4a80-a20d-581ebe08da72"
                }
            }
        )
        return res.status(r.status).json(r.data);
        
    }
    catch (e) {
       if (e.response && e.response.status && e.response.data) {
  return res.status(e.response.status).json(e.response.data);
} else {
  // Handle the error when the response object is undefined or missing properties
  return res.status(500).json({ error: 'Internal Server Error' });
}


        
    }
  
});

app.listen(3001);