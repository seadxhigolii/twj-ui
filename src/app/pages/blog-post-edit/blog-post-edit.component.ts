import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { UpdateBlogPostCommand } from 'src/shared/interfaces/blogPost/updateBlogPostCommand.interface';

@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrls: ['./blog-post-edit.component.scss']
})
export class BlogPostEditComponent implements OnInit {
  blogPost: UpdateBlogPostCommand = {} as UpdateBlogPostCommand;

  constructor(private blogPostService: BlogpostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.blogPost = {} as UpdateBlogPostCommand;
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.blogPostService.getById(id).subscribe(response => {
          this.blogPost.id = response.id;
          this.blogPost.content = response.content;
          this.blogPost.title = response.title;
          
        }, error => {
          console.error('Error fetching blog post:', error);
        });
      }
    });
  }

  submitForm(): void {
    const formData: UpdateBlogPostCommand = {
      id: this.blogPost.id,
      title: this.blogPost.title,
      content: this.blogPost.content
    };
    
    this.blogPostService.update(formData).subscribe(response=>{
    });
  }

}
