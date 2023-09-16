import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpetchToTextComponent } from './components/spetch-to-text/spetch-to-text.component';

const routes: Routes = [
  {
    path: '', component: SpetchToTextComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
