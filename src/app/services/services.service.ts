import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { basketballPlayer } from '../models/basketballPlayer.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

    private path = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    getAllPlayers(): Observable<any> {
        return this.httpClient.get<any[]>(this.path + "/Players/GetPlayers");
    }

    editPlayer(player: basketballPlayer): any {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient.put(this.path + "/Players/Put", JSON.stringify(player), { headers: header })
    }

    createNewPlayer(player : basketballPlayer): any {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient.post(this.path + "/Players/Post", JSON.stringify(player), { headers: header })
    }

    deletePlayer(player: basketballPlayer): any {
        return this.httpClient.delete(this.path + "/Players/Delete/" + player.playerId)
    }


}