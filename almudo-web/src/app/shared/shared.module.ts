import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './components/filter/filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { GetConfigService } from './services/get-config.service';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    FilterComponent,
    ProductComponent,
    SearchPipe
  ],
  exports: [
    FilterComponent,
    ProductComponent,
    SearchPipe,
    FormsModule
  ],
  providers: [
    GetConfigService
  ]
})
export class SharedModule { }
