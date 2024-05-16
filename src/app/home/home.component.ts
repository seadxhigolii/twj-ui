import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from 'src/shared/interfaces/blogPost.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','../../shared/bootstrap.min.css','../../shared/homestyle.scss']
})
export class HomeComponent implements OnInit {
  currentYear : Number | undefined;
  blogPostList: BlogPost; 
  constructor(private blogPostService: BlogpostService,) { }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
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
    this.blogPostService.getAll().subscribe(result=>{
      this.blogPostList = result as any;
      console.log(this.blogPostList)
    })
  }

}
