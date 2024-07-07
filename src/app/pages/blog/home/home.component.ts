import { Component, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { CombinedBlogPostModel } from 'src/shared/interfaces/blogPost/combinedBlogPostModel.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsLetterSubscriberService } from 'src/app/services/newslettersubscriber.service';
import { Response } from 'src/shared/interfaces/responses/response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class HomeComponent implements OnInit {
  blogPostList: BlogPost; 
  combinedBlogPostList: CombinedBlogPostModel;  
  newsletterForm: FormGroup;
  responseMessage : string = '';
  showSuccessMessage : boolean = false;
  
  constructor(
    private blogPostService: BlogpostService,
    private router: Router,
    private newsLetterSubscriberService: NewsLetterSubscriberService) {
      this.newsletterForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      }); 
    }

  ngOnInit(): void {
    this.getAllBlogPosts();
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

  getAllBlogPosts(){
    this.blogPostService.getTopTags().subscribe(result=>{
      this.combinedBlogPostList = result as CombinedBlogPostModel;
    })
  }

  viewAll() {
    this.router.navigate(['all-posts']);
  }

  viewTagRelated(tagName: string) {
    this.router.navigate(['tagged-posts/' + tagName.toLowerCase()]);
  }

  redirectToAuthorPosts(authorName: string) {
    this.router.navigate(['author-posts/' + authorName]);    
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
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
