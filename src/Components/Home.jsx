import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "407896e4ddaf7ce8099511dda38b49f5";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
// .nv k package se secure karo

const Card = ({ img }) => <img src={img} className="card" alt="cover"></img>;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card key={index} img={`${imgUrl}${item.poster_path}`} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, settopRatedMovies] = useState([]);
  const [genre, setgenre] = useState([]);
  // async await coz we do not know how much timw it will take to fetch data so we want our app to work asynchronously
  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
      // https://api.themoviedb.org/3/movie/now_playing?api_key=407896e4ddaf7ce8099511dda38b49f5
    };
    const fetchnowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setnowPlayingMovies(results);
      // https://api.themoviedb.org/3/movie/now_playing?api_key=407896e4ddaf7ce8099511dda38b49f5
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
      // https://api.themoviedb.org/3/movie/now_playing?api_key=407896e4ddaf7ce8099511dda38b49f5
    };
    const fetchtopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      settopRatedMovies(results);
      // https://api.themoviedb.org/3/movie/now_playing?api_key=407896e4ddaf7ce8099511dda38b49f5
    };
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setgenre(genres);
      // https://api.themoviedb.org/3/genre/movie/list?api_key=407896e4ddaf7ce8099511dda38b49f5
    };
    getAllGenre();
    fetchUpcoming();
    fetchnowPlaying();
    fetchPopular();
    fetchtopRated();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}${popularMovies[0].poster_path}`})`
            : "rgb(16,16,16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
          <button>
            Play <BiPlay />
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular on Netflix"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
