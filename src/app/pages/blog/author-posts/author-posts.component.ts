import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { GetByAuthorFilteredModel } from 'src/shared/interfaces/blogPost/getByAuthorFilteredModel.interface';
import { UserService } from '../../../services/user.service';
import { GetUserByIdModel } from '../../../../shared/interfaces/user/getUserByIdModel.interface';

@Component({
  selector: 'app-author-posts',
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class AuthorPostsComponent implements OnInit {
 
  authorName: string = '';
  capitalizedAuthorName: string = '';
  blogPostList: GetByAuthorFilteredModel[];
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;
  totalItems: number = 0;
  authorId: string = '';
  author : GetUserByIdModel
  
  constructor(
    private blogPostService: BlogpostService,    
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const encodedTag = params.get('authorName')!;
      this.authorName = decodeURIComponent(encodedTag);
      this.capitalizedAuthorName = this.capitalizeWord(this.authorName);
      this.getByAuthorFiltered();
    });
  }

  private _getAuthor() {
    this.userService.getById(this.authorId).subscribe(respose=>{
      this.author = respose;
    });
  }

  capitalizeWord(input: string): string {
    return input.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
  }

  getByAuthorFiltered() {
    this.blogPostService.getByAuthorFiltered(this.currentPage, this.pageSize, this.authorName)
      .subscribe(result => {
        this.blogPostList = result.data as GetByAuthorFilteredModel[];
        
        if (this.blogPostList && this.blogPostList.length > 0) {
          this.authorId = this.blogPostList[0].userId;
          this._getAuthor();
        }
  
        this.totalPages = result.totalPages;
        this.totalItems = result.totalItems;
      }, error => {
        this.router.navigate(['error-page']);
        console.error("Error fetching data:", error);
      });
  }
  
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.getByAuthorFiltered();
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
  }
}
