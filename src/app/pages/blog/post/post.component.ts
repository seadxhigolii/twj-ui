import { Component, HostListener, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlogpostService } from '../../../services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';
import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { ViewportScroller } from '@angular/common';
import { AddAdClickCommand } from 'src/shared/interfaces/adClick/addAdClickCommand.interface';
import { AdClickService } from 'src/app/services/adclick.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class PostComponent implements OnInit {
  public isLargeScreen: boolean;
  blogPost: BlogPost | null = null;
  blogPostList: BlogPost[] | null = null;
  tags: string[] = [];
  email: string = '';
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;
  bannerList: Banner[];
  topBanner: Banner | undefined;
  rightBanner: Banner | undefined;
  adClick: AddAdClickCommand;
  pathAndQuery : string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogpostService,
    private sanitizer: DomSanitizer,
    private newsLetterSubscriberService: NewsLetterSubscriberService,
    private bannerService: BannerService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private adClickService: AdClickService
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
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);    
    this.pathAndQuery = parsedUrl.hash;
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
          }
        );
      }
    });
  }
  

  getBlogPostsByTagName(tag: string) {
    this.router.navigate(['tagged-posts/', tag]);
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

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/', authorName]);
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
  }  
  
  onBannerClick(banner: Banner) {   
    this.adClick = {
      bannerId: banner.id,
      blogPostId: '00000000-0000-0000-0000-000000000000',
      clickTime: new Date(),
      productId: banner.productId,
      url: this.pathAndQuery
    };    
    this.adClickService.add(this.adClick).subscribe();
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.blogPost.title);
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  shareOnPinterest(): void {
    const url = encodeURIComponent(window.location.href);
    const media = encodeURIComponent(this.blogPost.image);
    const description = encodeURIComponent(this.blogPost.title);
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${description}`;
    window.open(shareUrl, '_blank', 'width=750,height=320');
  }
}
