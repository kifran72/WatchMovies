import Cors from "cors";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  // await runMiddleware(req, res, cors);
  const getData = await fetch(`https://api.tvmaze.com/shows`);
  const data = await getData.json();

  res.status(200).json(data);
}

export default handler;
