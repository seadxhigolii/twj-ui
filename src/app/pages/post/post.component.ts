import { Component, HostListener, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlogpostService } from '../../services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriber } from 'src/shared/interfaces/newsLetterSubscriber.interface';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';
import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class PostComponent implements OnInit {
  blogPost: BlogPost | null = null;
  blogPostList: BlogPost[] | null = null;
  tags: string[] = [];
  public isLargeScreen: boolean;
  email: string = '';
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;
  bannerList: Banner[];
  topBanner: Banner | undefined;
  rightBanner: Banner | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogpostService,
    private sanitizer: DomSanitizer,
    private newsLetterSubscriberService: NewsLetterSubscriberService,
    private bannerService: BannerService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { 
    this.isLargeScreen = window.innerWidth > 991;
    this.newsletterForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isLargeScreen = window.innerWidth > 991;
  }
  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.getBlogPost();
    this.getRelatedPosts();
    this.getRandomBanners();
  }

  getBlogPost() {
    this.activatedRoute.params.subscribe(params => {
      const url = params['url'];
      if (url) {
        this.blogPostService.getByUrl(url).subscribe(
          result => {
            this.blogPost = result;
            if (this.blogPost && this.blogPost.tags) {
              this.tags = this.blogPost.tags.split(',').map(tag => tag.trim());
            }
          },
          error => {
            this.router.navigate(['error-page']);
          }
        );
      }
    });
  }

  getRelatedPosts() {
    this.activatedRoute.params.subscribe(params => {
      const url = params['url'];
      if (url) {
        this.blogPostService.getRelated(url).subscribe(
          result => {
            this.blogPostList = result.filter(post => post.url !== url);
            console.log("this.blogPostList: ",this.blogPostList)
          }
        );
      }
    });
  }
  

  getBlogPostsByTagName(tag: string) {
    this.router.navigate(['/tagged-posts', tag]);
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

  getRandomBanners() {
    this.bannerService.getRandom().subscribe(result=>{
      this.bannerList = result; 
      this.topBanner = this.bannerList.find(banner => banner.position === 'Top');
      this.rightBanner = this.bannerList.find(banner => banner.position === 'Right');
    })
  }

  scrollToTop() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
