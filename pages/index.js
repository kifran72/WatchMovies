import dynamic from "next/dynamic";
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

const Home = (props) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const movies = props.data;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Accueil</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/IconOnglet.jpg" />
      </Head>
      <ElevationScroll {...props}>
        <Navbar user={user} page="home" />
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      <Background user={user} />
      <div className={styles.wrapper}>
        {movies.map((movie, key) => (
          <div className={styles.item} key={key}>
            <img src={movie.image.medium} alt="" /> <br />
            <h1>{movie.name}</h1>
            <h1>Types</h1>
            {movie.genres.map((genre, keyGenre) => (
              <p key={keyGenre}>{genre}</p>
            ))}
          </div>
        ))}
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

export async function getStaticProps(context) {
  const getData = await fetch(`https://api.tvmaze.com/shows`);
  const data = await getData.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
