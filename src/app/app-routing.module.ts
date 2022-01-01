import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoInternalComponent } from './demo-internal/demo-internal/demo-internal.component';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'demo', component: DemoComponent},
  {path: 'demo-internal', component: DemoInternalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
