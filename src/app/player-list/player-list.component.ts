import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { basketballPlayer } from '../models/basketballPlayer.model';
import { ServicesService } from '../services/services.service';
import { PlayerFormComponent } from './player-form/player-form.component';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  dataSources!: MatTableDataSource<basketballPlayer>;
  displayedColumns: string[] = ['name', 'jerseyNumber', 'Actions'];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private services: ServicesService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  async getPlayers() {
    console.log('this gets the players from db')
    await this.services.getAllPlayers().subscribe((res: basketballPlayer[] | undefined) => {
      this.dataSources = new MatTableDataSource(res);
    });
    
  }

  addPlayer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';

    let dialogRef = this.dialog.open(PlayerFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res != 0) {
        console.log('The dialog was closed but player was created');

        this._snackBar.open("Player was created Successfully", "Close", {
          duration: 2000,
        });
      }
      else {
        console.log('The dialog was closed');
      }
      this.getPlayers();
    });

  }

  editPlayer(player: basketballPlayer) {
    console.log(player.name + " player to edit")

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';
    dialogConfig.data = {
      player: player
    }

    let dialogRef = this.dialog.open(PlayerFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res != 0) {
        console.log('The dialog was closed but player was edited');

        this._snackBar.open("Player was created Edited", "Close", {
          duration: 2000,
        });
      }
      else {
        console.log('The dialog was closed');
      }
      this.getPlayers();
    });
  }

  async deletePlayer(player: basketballPlayer) {
    console.log(player + " player to delete")

    await this.services.deletePlayer(player).subscribe((res: any) => {
      this._snackBar.open("Player was Deleted Successfully", "Close", {
        duration: 2000,
      });
      this.getPlayers();
    });
  }

}