import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { basketballPlayer } from 'src/app/models/basketballPlayer.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  newPlayer: basketballPlayer | undefined;
  isEdit: boolean = false;

  constructor(public dialogRef: MatDialogRef<PlayerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar,  private services: ServicesService) { }

    newPlayerForm = new FormGroup({
      name: new FormControl(''),
      jerseyNumber: new FormControl(null)
    });

  ngOnInit(): void {
    if (this.data != null) {
      this.newPlayerForm = new FormGroup({
        name: new FormControl(this.data.player.name),
        jerseyNumber: new FormControl(this.data.player.jerseyNumber)
      });
      this.isEdit = true;
    }
  }

  
  onNoClick(): void {
    this.dialogRef.close(0);
  }

  async onSubmit() {
    if(this.isEdit == false){
      this.newPlayer = new basketballPlayer(0,this.newPlayerForm.value.name!, this.newPlayerForm.value.jerseyNumber!);
      await this.services.createNewPlayer(this.newPlayer).subscribe((res: any) => {
        this.dialogRef.close(0);
      });
    }else{
      this.newPlayer = new basketballPlayer(this.data.player.playerId,this.newPlayerForm.value.name!, this.newPlayerForm.value.jerseyNumber!);
      await this.services.editPlayer(this.newPlayer).subscribe((res: any) => {
        this.dialogRef.close(0);
      });
    }
    
  }

}