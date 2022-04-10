import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { items } from 'src/app/data/items';
import { getCurrencyStringFromNumber } from 'src/app/functions/get-currency-string-from-number';
import { Item } from 'src/app/types/item';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, AfterViewInit {

@ViewChild(MatSort) sort!: MatSort;
  
  public getCurrencyStringFromNumber = getCurrencyStringFromNumber;

  public itemList: Item[] = [];
  public brandList: string[] = [];
  public displayedColumns: string[] = ['brand', 'model', 'price'];
  public dataSource: MatTableDataSource<Item>;
  
  constructor(private readonly router: Router) {

    this.dataSource = new MatTableDataSource(this.itemList);
  }

  ngOnInit(): void {
    this.itemList = items.filter((item) => item.stockAmmount !== 0);
    this.brandList = this.getAllBrandsFromItems()
    this.dataSource = new MatTableDataSource(this.itemList);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public getAllBrandsFromItems(): string[] {
    let brands: string[] = [];
    //Fill brands from all items into an array
    this.itemList.forEach((item) => brands.push(item.brand));
    //Remove duplicates by using Set and sort them alphabetically afterwards
    return [...new Set(brands)].sort((a, b) => a.localeCompare(b));
  }

  public navigateToItemDetails(id: number): void {
    this.router.navigate(['/item-details', { id }]);
  }

  public setBrandFilter(value: string[]): void {
    if (value.length === 0) {
      this.dataSource.data = this.itemList;
      return
    }
    this.dataSource.data = this.itemList.filter((item) => value.includes(item.brand)); 
  }


  public setPriceFilter(): void {

  }

  public sortData(sort: Sort) {
    const data = this.itemList.slice();
    if (!sort.active || sort.direction === '') {
      this.itemList = data;
      return;
    }

    this.itemList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'brand':
          return this.compare(a.brand, b.brand, isAsc);
        case 'model':
          return this.compare(a.model, b.model, isAsc);
        case 'price':
          return this.compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
  
  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

