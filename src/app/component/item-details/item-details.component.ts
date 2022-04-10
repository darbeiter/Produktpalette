import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { items } from 'src/app/data/items';
import { Item } from 'src/app/types/item';
import { getCurrencyStringFromNumber } from 'src/app/functions/get-currency-string-from-number';
import {ItemListComponent} from "src/app/component/item-list/item-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  getCurrencyStringFromNumber = getCurrencyStringFromNumber;


  public item!: Item
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    this.item = items.find( (item) => Number(routeParams.get('id')) === item.id) ?? {} as Item;

  }

  public buyItem(): void {
    if(this.item.stockAmmount === 0)
    {
      this.navigateToItemList();
      return;
    } else if(this.item.stockAmmount == 1 )
    {
      this.item.stockAmmount--;
      this.navigateToItemList();
    } else {
      this.item.stockAmmount--;
    }
    
  }

  public navigateToItemList(): void {
    this.router.navigate(['/item-list']);
  }


  
}
