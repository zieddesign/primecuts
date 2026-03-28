import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AnotherCutComponent } from './another-cut.component';

const routes: Routes = [
  { path: '', component: AnotherCutComponent }
];

@NgModule({
  declarations: [AnotherCutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
  
  ]
})
export class AnotherCutModule {}
