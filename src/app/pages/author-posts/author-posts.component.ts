import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { GetByAuthorFilteredModel } from 'src/shared/interfaces/blogPost/getByAuthorFilteredModel.interface';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Component({
  selector: 'app-author-posts',
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss']
})
export class AuthorPostsComponent implements OnInit {

  authorName: string = '';
  capitalizedAuthorName: string = '';
  blogPostList: GetByAuthorFilteredModel[];
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;
  totalItems: number = 0;
  currentYear: number = 0;
  bannerList: Banner[];
  topBanner: Banner;
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;
  
  constructor(
    private blogPostService: BlogpostService,    
    private route: ActivatedRoute,
    private bannerService: BannerService,
    private newsLetterSubscriberService: NewsLetterSubscriberService,
    private router: Router
  ) {     
    this.newsletterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    console.log("HERE")
    this.route.paramMap.subscribe(params => {
      const encodedTag = params.get('authorName')!;
      this.authorName = decodeURIComponent(encodedTag);
      this.capitalizedAuthorName = this.capitalizeWord(this.authorName);
      this.getByAuthorFiltered();
    });

  }

  capitalizeWord(input: string): string {
    return input.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
  }

  getRandomBanners() {
    this.bannerService.getRandom().subscribe(result=>{
      this.bannerList = result; 
      this.topBanner = this.bannerList.find(banner => banner.position === 'Top');
    })
  }

  getByAuthorFiltered() {
    this.blogPostService.getByAuthorFiltered(this.currentPage, this.pageSize, this.authorName)
      .subscribe(result => {
        this.blogPostList = result.data as GetByAuthorFilteredModel[];
        this.totalPages = result.totalPages;
        this.totalItems = result.totalItems;
      }, error => {
        this.router.navigate(['error-page']);
        console.error("Error fetching data:", error);
      });
  }
  

  subscribe() {
    if (this.newsletterForm.valid) {
      this.newsLetterSubscriberService.add(this.newsletterForm.get('email').value).subscribe(
        (result: Response<boolean>) =>{
          if(result.statusCode === 200) {
            this.responseMessage = "Thank you :)";
            this.showSuccessMessage = true;
            this.newsletterForm.get('email').reset();
          }
          else{
            this.showSuccessMessage = false;
          }
        },
        error => {
          console.error('There was an error:', error);
        }
      );
    }
  }
  
  onPageChange(page: number) {
    this.currentPage = page;
    this.getByAuthorFiltered();
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }

}
