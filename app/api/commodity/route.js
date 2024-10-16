import axios from 'axios';

export default function handler(req, res) {
  const country = req.query.country;
  const url = `https://api.imf.org/commodity-data?country=${country}&category=food&beverages`;

  axios.get(url)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}
