import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateAnimalComponent } from './create-animal/create-animal.component';
import { ListAnimalComponent } from './list-animal/list-animal.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    CreateAnimalComponent,
    ListAnimalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
