import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from '../movie.service';
import {Subscription} from 'rxjs';
import {Movie} from '../movie.model';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  private movieUpdatedSub: Subscription;
  moviesPerPage = 10;
  currentPage = 1;
  totalMovie = 0;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.movieService.getMovies(this.moviesPerPage, this.currentPage);
    this.movieUpdatedSub = this.movieService.getMovieUpdatedListener()
      .subscribe((movieData: {movies: Movie[], movieCount: number}) => {
      this.movies = movieData.movies;
      this.totalMovie = movieData.movieCount
      console.log(movieData.movieCount);
    });
    console.log(this.movies);
  }

  onChangedPage(pageDate: PageEvent) {
    this.currentPage = pageDate.previousPageIndex;
    this.moviesPerPage = pageDate.pageSize;
    this.movieService.getMovies(this.moviesPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.movieUpdatedSub.unsubscribe();
  }

}
