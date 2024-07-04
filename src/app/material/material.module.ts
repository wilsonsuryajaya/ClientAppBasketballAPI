import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

// Import all the angular modules at the top
// Export it at the bottom

@NgModule({
    declarations:[],
    imports:[],
    exports: [
        MatTableModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule { }