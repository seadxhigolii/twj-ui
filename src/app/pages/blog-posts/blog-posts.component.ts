import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from 'src/app/layouts/generic-table/generic-table.component';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';
import { GetFilteredBlogPostModel } from 'src/shared/interfaces/blogPost/getFilteredBlogPostModel.interface';
import { FilterRequest } from 'src/shared/interfaces/requests/filterRequest.interface';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  tableConfig: TableConfig<any>;

  public blogPostList: GetFilteredBlogPostModel[];
  public title = 'Blog Postss';
  
  filterRequest: FilterRequest = { search: '', pageSize: 10, page: 1 };
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  constructor(private blogPostService: BlogpostService,
    private router: Router) { }

 

  blogPostBody : string;

  ngOnInit(): void {
    this.tableConfig = {
      columns: [
        { name: 'Title', dataKey: 'title', isSortable: true },
        { name: 'Author', dataKey: 'authorName', isSortable: true },
        { name: 'Actions', dataKey: 'Action', action: 'edit' }
      ],
      getFiltered: this.blogPostService.getFilteredTable.bind(this.blogPostService),
      getEditRoute: (item: GetFilteredBlogPostModel) => ['/blog-posts-edit', item.id]
    };
  }

  loadData(): void {
    this.blogPostService.getFilteredTable(this.filterRequest).subscribe(response => {
      this.blogPostList = response.data;
      this.totalPages = response.totalPages;
      this.currentPage = this.filterRequest.page;
      this.updatePages(); 
    }, error => {
      console.error('Failed to load blog posts:', error);
    });
  }

  navigateToBlogPostsCreate(): void {
    this.router.navigate(['/blog-posts-create']);
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

  editBlogPost(blogPost: GetFilteredBlogPostModel): void {
    // Assuming you have routing set up for editing
    this.router.navigate(['/blog-posts-edit', blogPost.id]);
  }
  /*----------------------PAGINATOR FUNCTIONS--------------------- */
}
