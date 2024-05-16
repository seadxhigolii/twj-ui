import { Component, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tagged-posts',
  templateUrl: './tagged-posts.component.html',
  styleUrls: ['./tagged-posts.component.scss','../../../shared/bootstrap.min.css','../../../shared/homestyle.scss']
})
export class TaggedPostsComponent implements OnInit {
  currentYear : Number | undefined;
  blogPostList: BlogPost; 
  tag: string = '';
  capitalizedTag: string = '';

  constructor(
    private blogPostService: BlogpostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    
    this.route.paramMap.subscribe(params => {
      const encodedTag = params.get('tag')!;
      this.tag = decodeURIComponent(encodedTag);
      this.capitalizedTag = this.capitalizeWord(this.tag);
      this.getAllBlogPostsByTagName(this.tag);
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

  getAllBlogPostsByTagName(tag: string){
    this.blogPostService.getByTagName(tag).subscribe(result=>{
      this.blogPostList = result as any;
    })
  }

  capitalizeWord(input: string): string {
    return input.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase());
  }

}
