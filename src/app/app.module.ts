import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpetchToTextComponent } from './components/spetch-to-text/spetch-to-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableDataComponent } from './components/table-data/table-data.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HttpClientModule } from  '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SpetchToTextComponent,
    TableDataComponent,
    PaginationComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
