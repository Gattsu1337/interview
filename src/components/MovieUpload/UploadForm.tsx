import { useState } from "preact/hooks";
import '../../styles.css';
import MovieCard from "../PreviewPage/MovieCard";
import AddMovieForm from "../AddMovie/AddMovieForm";
import Button from "../Button";

const UploadForm = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    type Movie = {
        id: number;
        title: string;
        isWatched: boolean;
        rating: number;
    }

    const handleAddMovie = (newMovie: Omit<Movie, "id">) => {
        setMovies(prevMovies => [
          ...prevMovies, 
          { ...newMovie, id: Date.now() } 
        ]);
      };
    
    const handleDeleteMovie = (id: number) => {
        setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
    };

    const handleSaveList = async () => {
        const movieData = movies.map(({ id, title, isWatched, rating }) => ({
            title,
            isWatched,
            rating
        }));

        console.log(movieData);

        try {
            const response = await fetch("https://dummyapi.com/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ movies: movieData })
            });

            if (response.ok) {
                alert("Movies saved successfully!");
            } else {
                alert("Failed to save movies.");
            }
        } catch (error) {
            console.error("Error saving movies:", error);
            alert("An error occurred while saving.");
        }
    };

    const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (text) {
                    const titles = (e.target?.result as string).split("\n").map(title => title.trim()).filter(title => title);
                    const newMovies = titles.map((title, index) => ({
                        id: Date.now() + index,
                        title,
                        isWatched: false,
                        rating: 0,
                    }));
                    setMovies(newMovies);
                }
            }
            reader.readAsText(file);
        }
    }

    return(
        <div className={"upload-form-container"}>
            <input id={"uploadBtn"} type="file" accept=".txt" onChange={handleUploadChange}/>
            <h2>Movie List</h2>
            <div className={"movie-list"}>
                {movies.length > 0 ? (movies.map((movie, index) => (
                    <MovieCard key={movie.id} title={movie.title} isWatched={movie.isWatched} rating={movie.rating} index={index} onDelete={() => handleDeleteMovie(movie.id)}/>
                ))) : (<div>No movies to display</div>)}
            </div>
            <AddMovieForm onAddMovie={handleAddMovie}></AddMovieForm>
            <Button text={"Save List"} onClick={handleSaveList}></Button>
        </div>
    )
    
}

export default UploadForm;