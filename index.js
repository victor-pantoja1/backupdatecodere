const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

const OWNER = 'victor-pantoja1';
const REPO = 'codere-test-update';

app.get('/check-version/:providedVersion', async (req, res) => {
    try {
      const providedVersion = req.params.providedVersion;
  
      const response = await axios.get(`https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`);
      const latestVersionWithPrefix = response.data.tag_name;
      const latestVersion = latestVersionWithPrefix.replace('v', '');
  
      if (providedVersion < latestVersion) {
        const releaseUrl = `https://github.com/${OWNER}/${REPO}/releases/download/v${latestVersion}/dist.zip`;
        res.json({ isNewerVersionAvailable: true, releaseUrl, latestVersion });
      } else {
        res.json({ isNewerVersionAvailable: false, latestVersion });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al verificar la versión.' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});