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
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tagList : GetAllTagModel [] = [];
  currentPage: number = 1;
  pageSize: number = 13;
  totalPages: number = 1;
  totalItems: number = 0;
  currentYear: number = 0;
  bannerList: Banner[];
  topBanner: Banner;

  constructor(
    private tagService: TagService,
    private bannerService: BannerService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentYear = (new Date()).getFullYear();
    this.getTagsPaginated(this.currentPage);
    this.getRandomBanners();
  }

  getBlogPostsByTagName(tag: string) {
    this.router.navigate(['/tagged-posts', tag]);
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

  getRandomBanners() {
    this.bannerService.getRandom().subscribe(result=>{
      this.bannerList = result; 
      this.topBanner = this.bannerList.find(banner => banner.position === 'Top');
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getTagsPaginated(this.currentPage);
  }

}
