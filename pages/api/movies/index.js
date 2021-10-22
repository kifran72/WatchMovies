export default async function handler(req, res) {
  const getData = await fetch(`https://api.tvmaze.com/shows`);
  const data = await getData.json();
  res.status(200).json(data);
}
