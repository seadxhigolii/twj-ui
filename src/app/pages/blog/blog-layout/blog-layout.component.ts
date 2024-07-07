import { Component, OnInit } from '@angular/core';
import { AdClickService } from 'src/app/services/adclick.service';
import { BannerService } from 'src/app/services/banner.service';
import { AddAdClickCommand } from 'src/shared/interfaces/adClick/addAdClickCommand.interface';
import { Banner } from 'src/shared/interfaces/banner.interface';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class BlogLayoutComponent implements OnInit {
  bannerList: Banner[];
  topBanner: Banner | undefined;
  adClick: AddAdClickCommand;
  pathAndQuery : string = '';
  showModal: boolean = false;

  constructor(
    private bannerService: BannerService,
    private adClickService: AdClickService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showModal = true;
    }, 5000);
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);    
    this.pathAndQuery = parsedUrl.hash;
    this.getRandomBanner();
  }

  getRandomBanner() {
    this.bannerService.getRandom().subscribe(result=>{
      this.bannerList = result; 
      this.topBanner = this.bannerList.find(banner => banner.position === 'Top');
    })
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

}
