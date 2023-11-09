import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideComponent } from './left-side/left-side.component';
import { MatIconModule } from '@angular/material/icon';
import { BotSideComponent } from './bot-side/bot-side.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { TopSideComponent } from './top-side/top-side.component';
import { TranslateModule } from '@ngx-translate/core';
import { TopRightSideComponent } from './top-right-side/top-right-side.component';


@NgModule({
  declarations: [LeftSideComponent, BotSideComponent, TopSideComponent, TopRightSideComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule],
  exports:[LeftSideComponent,BotSideComponent,TopSideComponent,TopRightSideComponent]
})
export class PortalModule { }
