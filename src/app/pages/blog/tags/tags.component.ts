import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from 'src/app/services/banner.service';
import { TagService } from 'src/app/services/tag.service';
import { Banner } from 'src/shared/interfaces/banner.interface';
import { GetAllTagModel } from 'src/shared/interfaces/tag/getAllTagModel.interface';
import { GetFilteredTagModel } from 'src/shared/interfaces/tag/getFilteredTagModel.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class TagsComponent implements OnInit {

  tagList : GetAllTagModel [] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 1;
  totalItems: number = 0;

  constructor(
    private tagService: TagService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTagsPaginated(this.currentPage);
  }

  getBlogPostsByTagName(tag: string) {
    this.router.navigate(['tagged-posts/', tag]);
  }

  getAllTags() {
    this.tagService.getAll().subscribe(result=> {
      this.tagList = result as GetAllTagModel[];
    })
  }

  getTagsPaginated(currentPage: number) {
    this.tagService.getFiltered(currentPage,this.pageSize).subscribe(result=> {
      this.tagList = result.data as GetFilteredTagModel[];
      this.totalPages = result.totalPages;
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getTagsPaginated(this.currentPage);
  }

  redirectToPost(title: string) {
    this.router.navigate(['post/' + title]);    
  }

}
