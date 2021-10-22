export default async function categoryHandler({ query: { title } }, res) {
  const getData = await fetch(`https://api.tvmaze.com/search/shows?q=` + title);
  const data = await getData.json();
  // Movies with category exists
  if (data) {
    res.status(200).json(data);
  } else {
    res
      .status(404)
      .json({ message: `Movies with category: ${title} not found.` });
  }
}
