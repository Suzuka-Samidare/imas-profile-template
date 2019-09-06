import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { MainContentsComponent } from './main-contents/main-contents.component';
import { HeaderComponent } from './components/Organisms/header/header.component';
import { ResultDataListComponent } from './result-data-list/result-data-list.component';
import { FormSingleTextfieldComponent } from './components/Molecules/form-single-textfield/form-single-textfield.component';
import { ProfileDetailMillionComponent } from './components/Molecules/profile-detail-million/profile-detail-million.component';
import { ProfileDetailCinderellaComponent } from './components/Molecules/profile-detail-cinderella/profile-detail-cinderella.component';
import { ProfileDetailShinycolorsComponent } from './components/Molecules/profile-detail-shinycolors/profile-detail-shinycolors.component';
import { ProfileDetailSidemComponent } from './components/Molecules/profile-detail-sidem/profile-detail-sidem.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContentsComponent,
    HeaderComponent,
    ResultDataListComponent,
    FormSingleTextfieldComponent,
    ProfileDetailMillionComponent,
    ProfileDetailCinderellaComponent,
    ProfileDetailShinycolorsComponent,
    ProfileDetailSidemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
