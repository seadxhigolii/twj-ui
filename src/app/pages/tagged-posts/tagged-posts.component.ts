import { Component, HostListener, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { BannerService } from 'src/app/services/banner.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { GetFilteredBlogPostModel } from 'src/shared/interfaces/blogPost/getFilteredBlogPostModel.interface';

@Component({
  selector: 'app-tagged-posts',
  templateUrl: './tagged-posts.component.html',
  styleUrls: ['./tagged-posts.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss']
})
export class TaggedPostsComponent implements OnInit {
  currentYear : Number | undefined;
  blogPostList: GetFilteredBlogPostModel[] = []; 
  tag: string = '';
  capitalizedTag: string = '';
  public isLargeScreen: boolean;
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;
  bannerList: Banner[];
  topBanner: Banner | undefined;
  rightBanner: Banner | undefined;
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 1;
  totalItems: number = 0;

  constructor(
    private blogPostService: BlogpostService,
    private route: ActivatedRoute,
    private newsLetterSubscriberService: NewsLetterSubscriberService,
    private bannerService: BannerService,
    private router: Router) { 
      this.isLargeScreen = window.innerWidth > 991;
      this.newsletterForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      });
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event) {
      this.isLargeScreen = window.innerWidth > 991;
    }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    
    this.route.paramMap.subscribe(params => {
      const encodedTag = params.get('tag')!;
      this.tag = decodeURIComponent(encodedTag);
      this.capitalizedTag = this.capitalizeWord(this.tag);
      this.getByTagNamePaginated(this.tag);
    });

    document.addEventListener('DOMContentLoaded', () => {
      const customNavbarToggle = document.getElementById('customNavbarToggle');
      const customNavbarLinks = document.getElementById('customNavbarLinks');

      customNavbarToggle?.addEventListener('click', () => {
        customNavbarLinks?.classList.toggle('show');
      });
      
      document.addEventListener('click', (event) => {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.closest('.custom-navbar') && customNavbarLinks?.classList.contains('show')) {
          customNavbarLinks?.classList.remove('show');
        }
      });
    });
  }

  getByTagNamePaginated(tag: string){
    this.blogPostService.getByTagNamePaginated(this.currentPage, this.pageSize, tag).subscribe(result=>{
      this.blogPostList = result.data as GetFilteredBlogPostModel[];
      this.totalPages = result.totalPages;
      this.totalItems = result.totalItems;
    })
  }

  capitalizeWord(input: string): string {
    return input.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
  }

  getRandomBanners() {
    this.bannerService.getRandom().subscribe(result=>{
      this.bannerList = result; 
      this.topBanner = this.bannerList.find(banner => banner.position === 'Top');
      this.rightBanner = this.bannerList.find(banner => banner.position === 'Right');
    })
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
    this.getByTagNamePaginated(this.tag);
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }

}
