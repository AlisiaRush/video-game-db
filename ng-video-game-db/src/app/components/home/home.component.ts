import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string;
  public games: Array<Game>;
  constructor(
    private httpService: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  private routeSub: Subscription;
  private gameSub: Subscription;

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe((params: Params) => {
      if (params['game-seach']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
        console.log('What is sorting??? ', sort);
      });
  }

  openGameDetails(id: number): void{
    this.router.navigate(['details', id])
  }

  ngOnDestroy(): void {
  if(this.gameSub){
    this.gameSub.unsubscribe();
  }
  if(this.routeSub){
    this.routeSub.unsubscribe();
  }
  }
}





