import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RenderComponent } from './render/render.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { ControlComponent } from './control/control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConsoleComponent } from './console/console.component';
import { MatRadioModule } from '@angular/material/radio';
import { CellDirective } from './cell.directive';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatrixPreviewComponent } from './matrix-preview/matrix-preview.component';
import {MatButtonModule} from '@angular/material/button';
import { DecomposeComponent } from './decompose/decompose.component';
import { KatexModule } from 'ng-katex';

@NgModule({
  declarations: [
    AppComponent,
    RenderComponent,
    ControlComponent,
    ConsoleComponent,
    CellDirective,
    MatrixPreviewComponent,
    DecomposeComponent,
  ],
  imports: [
    KatexModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
