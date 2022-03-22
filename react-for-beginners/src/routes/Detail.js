import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <img src={movie.large_cover_image} alt={`background of ${movie.title}`} />
      <h1>{movie.title}</h1>
      <ul>
        {movie.genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
      <p> {movie.description_full} </p>
    </div>
  );
}

export default Detail;
