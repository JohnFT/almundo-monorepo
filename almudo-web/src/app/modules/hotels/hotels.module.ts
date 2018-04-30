import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { HotelsService } from './sevices/hotels.service';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    IndexComponent
  ],
  providers: [HotelsService]
})
export class HotelsModule { }
