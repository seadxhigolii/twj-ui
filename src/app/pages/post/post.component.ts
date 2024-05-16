import { Component, HostListener, OnInit, ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogpostService } from '../../services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriber } from 'src/shared/interfaces/newsLetterSubscriber.interface';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogPostService: BlogpostService,
    private sanitizer: DomSanitizer,
    private newsLetterSubscriberService: NewsLetterSubscriberService,
    private router: Router,
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
    window.scrollTo(0, 0);
    this.getBlogPost();
    this.getRelatedPosts();
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
            this.blogPostList = result;
            console.log(this.blogPostList)
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

}
