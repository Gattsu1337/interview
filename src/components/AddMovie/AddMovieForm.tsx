import { useForm } from 'react-hook-form';

type FormData = {
    title: string;
    isWatched: boolean;
    rating: number;
}

type AddMovieFormProps = {
    onAddMovie: (movie: FormData) => void;
  }

const AddMovieForm: React.FC<AddMovieFormProps> = ({onAddMovie}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        onAddMovie(data);
        reset(); 
    };
    
    return (
        <div className={"add-movie-form-holder"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Movie Title</label>
                    <input
                        id="title"
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                </div>
        
                <div id={"is-watched"}>
                    <label htmlFor="isWatched">Watched</label>
                    <input
                        id="isWatched"
                        type="checkbox"
                        {...register("isWatched")}
                    />
                </div>
        
                <div>
                    <label htmlFor="rating">Rating</label>
                    <select
                    id="rating"
                    {...register("rating", { required: "Rating is required" })}
                    >
                    <option value="">Select Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    </select>
                    {errors.rating && <p>{errors.rating.message}</p>}
                </div>

        
                <button type="submit">Add Movie</button>
            </form>
      </div>
        );
}

export default AddMovieForm;