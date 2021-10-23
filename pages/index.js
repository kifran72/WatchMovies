import dynamic from "next/dynamic";
import useSWR from "swr";
import { useState } from "react";

const Head = dynamic(() => import("next/head"));
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";

//Styles
import styles from "@css/home.module.css";

// Material
const KeyboardArrowUpIcon = dynamic(() =>
  import("@material-ui/icons/KeyboardArrowUp")
);
const Fab = dynamic(() => import("@material-ui/core/Fab"));
const Toolbar = dynamic(() => import("@material-ui/core/Toolbar"));

// Components
const Navbar = dynamic(() => import("@components/styles/navbar"));
const Background = dynamic(() => import("@components/styles/background"));
const ScrollTop = dynamic(() => import("@components/styles/scrollTop"));
const ElevationScroll = dynamic(() =>
  import("@components/styles/elevationScroll")
);

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = (props) => {
  const [user] = useAuthState(auth);
  // const [movies, setMovies] = useState([]);

  const router = useRouter();
  const { data } = useSWR("/api/movies", fetcher);
  const movies = data;

  useEffect(async () => {
    if (!user) {
      router.push("/login");
    } else {
      // const data = await getMoviesFromFirebase();
      // console.log(data);
      // setMovies(data);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/IconOnglet.jpg" />
      </Head>
      <ElevationScroll {...props}>
        <Navbar user={user} page="home" />
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      <Background user={user} />
      <div className={styles.wrapper}>
        {movies !== undefined ? (
          movies.map((movie, key) => (
            <div className={styles.item} key={key}>
              <a target="_blank" href={movie.url} rel="noreferrer">
                <img src={movie.image.medium} alt="" width={200} height={250} />
              </a>{" "}
              <br />
              <h1>{movie.name}</h1>
              <h1>Types</h1>
              {movie.genres.map((genre, keyGenre) => (
                <p key={keyGenre}>{genre}</p>
              ))}
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default Home;
