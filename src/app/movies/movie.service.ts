import {Movie} from './movie.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MovieService {
  private movies: Movie[] = [];
  moviesUpdated = new Subject<{ movies: Movie[], movieCount: number }>();

  constructor(private http: HttpClient) {
  }

  getMovieUpdatedListener(){
    return this.moviesUpdated.asObservable();
  }

  getMovies(moviesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${moviesPerPage}&page=${currentPage}`;

    this.http.get<{ message: string, movies: any, maxCount: number }>('http://localhost:3000/api/movies' + queryParams)
      .pipe(map(moviesData => {
        return {
          movies: moviesData.movies.map(movie => {
            return {
              title: movie.title,
              release_date: new Date(movie.release_date).getFullYear(),
              poster_path: movie.poster_path
            };
          }),
          maxMovies: moviesData.maxCount
        };
      }))
      .subscribe(responseData => {
        console.log('36',responseData);
        this.movies = responseData.movies;
        this.moviesUpdated.next({
          movies: [...this.movies],
          movieCount: responseData.maxMovies
        });
      });
  }
}
