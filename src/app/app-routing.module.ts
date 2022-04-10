import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './component/item-details/item-details.component';
import { ItemListComponent } from './component/item-list/item-list.component';

const routes: Routes = [
    { path: "item-list", component: ItemListComponent }, 
    { path: "item-details", component: ItemDetailsComponent },

    //default route 
    { path: "", redirectTo: "/item-list", pathMatch: "full" }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
