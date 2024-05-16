import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Template } from 'src/shared/interfaces/template.interface';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-templates-component',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private templateService: TemplateService,
    private router: Router) { 
    this.updatePages();
  }
  templateList : Template[];
  filterRequest : FilterRequest = { search: '',pageSize: 10,page: 1,   };;
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];
  page : number = 1; 

  ngOnInit(): void {
    this.templateService.getFiltered(this.filterRequest).subscribe(response=>{
      console.log("response: ",response.data)
      this.templateList = response.data;
    });
  }

  updatePages() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.filterRequest.page = page; // Update the filterRequest with the new page
  
    this.templateService.getFiltered(this.filterRequest).subscribe(response => {
      this.templateList = response.data;
      this.totalPages = response.totalPages; // Update totalPages based on the new response
      this.updatePages();
    });
  }

  navigateToTemplatesCreate(): void {
    this.router.navigate(['/templates-create']);
  }
}
