import {Movie} from "./Interfaces";

export default class MovieTileObj implements Movie {

    id?: number | 0;
    Type?: string | "";
    Title?: string | "";
    Poster?: string | "N/a";
    Year?: string | "";
    imdbID?: string | "";


    MovieTileObj(movie: Movie) {
        this.id = movie.id; 
        this.Year = movie.Year;
        this.Type = movie.Type;
        this.Title = movie.Title;
        this.Poster = movie.Poster;
        this.imdbID = movie.imdbID;
    }

}
