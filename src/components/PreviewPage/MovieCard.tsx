import { useState } from "preact/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import '../../styles.css';

type MovieCardProps = {
    title: string;
    index: number;
    rating: number;
    isWatched: boolean;
    onDelete: () => void;
}

const MovieCard = (props: MovieCardProps) => {
    const { title, rating, isWatched, onDelete } = props;

    const [movieTitle, setMovieTitle] = useState<string>(title);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(isWatched);
    const [selectedRating, setSelectedRating] = useState<number>(rating);

    const handleSpanEdit = () => {
        setIsEditing(true);
    }

    const handleBlur = () => {
        setIsEditing(false);
    }

    const handleMovieTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setMovieTitle((e.target as HTMLInputElement).value);
        }
    }

    return(
        <div className={"movie-card-container"}>
            <div className={"movie-title"}>
                {isEditing ? (
                    <input type="text" value={movieTitle} onChange={handleMovieTitleChange} onBlur={handleBlur} autoFocus/>
                ) : (
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div>
                            <FontAwesomeIcon icon={faEdit} onClick={handleSpanEdit} style={{ cursor: "pointer" }} />
                        </div>
                        <div >
                            <p>{movieTitle}</p>
                        </div> 
                    </div>
                )}
                
            </div>
            <div className={"movie-is-watched"}>
                <label>
                    <input type="checkbox" checked={checked} onChange={() => setChecked(prev => !prev)}/>
                    {checked ? "Watched" : "Not Watched"}
                </label>
            </div>
            <div className={"movie-rating"}>
                <select value={selectedRating} onChange={(e) => {setSelectedRating(Number((e.target as HTMLSelectElement).value))}}>
                    <option value={""}>Select Rating</option>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>
            <FontAwesomeIcon icon={faTrash} onClick={onDelete} style={{cursor: "pointer"}}/>
        </div>
    )
}

export default MovieCard;