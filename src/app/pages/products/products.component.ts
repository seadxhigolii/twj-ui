import { Component, OnInit } from '@angular/core';
import { TableConfig } from 'src/app/layouts/generic-table/generic-table.component';
import { ProductService } from 'src/app/services/product.service';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { Product } from 'src/shared/interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  tableConfig: TableConfig<any>; // Consider using a more specific type than `any` for your data

  public productList: Product[];
  public title = 'Products';
  
  filterRequest: FilterRequest = { search: '', pageSize: 10, page: 1 };
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  constructor(private productsService: ProductService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.tableConfig = {
      columns: [
        { name: 'Name', dataKey: 'productName', isSortable: true },
        { name: 'Vendor', dataKey: 'vendorName', isSortable: true }
      ],
      getFiltered: this.productsService.getFiltered.bind(this.productsService)
    };
  }

  loadData(): void {
    this.productsService.getFiltered(this.filterRequest).subscribe(response => {
      this.productList = response.data;
      this.totalPages = response.totalPages;
      this.currentPage = this.filterRequest.page;
      this.updatePages(); 
    }, error => {
      console.error('Failed to load products:', error);
    });
  }

  navigateToProductCreate(){
    this.router.navigate(['/products-create']);
  }
  
  /*----------------------PAGINATOR FUNCTIONS--------------------- */
  changeSort(sortBy: string): void {
    if (this.filterRequest.sortBy === sortBy) {
      this.filterRequest.sortDirection = this.filterRequest.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.filterRequest.sortBy = sortBy;
      this.filterRequest.sortDirection = 'asc';
    }
    this.currentPage = 1;
    this.filterRequest.page = 1;
    this.loadData(); 
  }

  updatePages(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; 
    }
    this.filterRequest.page = page; 
    this.loadData(); 
  }
  /*----------------------PAGINATOR FUNCTIONS--------------------- */
}
