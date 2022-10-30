import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';






@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatChipsModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatChipsModule,
        MatDividerModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class MaterialModule { }