import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilteredResponseDTO } from 'src/shared/dto/filtered-response.dto';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';


export interface TableColumn {
  name: string;
  dataKey: string;
  isSortable?: boolean;
}

export interface TableConfig<T> {
  columns: TableColumn[];
  getFiltered: (request: FilterRequest) => Observable<FilteredResponseDTO<T>>;
}

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> implements OnInit {
  @Input() config: TableConfig<T>;
  @Input() title: string = 'Generic Table';

  data: any[] = [];
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  filterRequest: FilterRequest = {
    search: '',
    pageSize: 10,
    page: 1
  };

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.config.getFiltered(this.filterRequest).subscribe(response => {
      this.data = response.data;
      this.totalPages = response.totalPages;
      this.currentPage = this.filterRequest.page;
      this.updatePages();
    }, error => {
      console.error('Failed to load data:', error);
    });
  }

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
}
