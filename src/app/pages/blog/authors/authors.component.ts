import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { Banner } from 'src/shared/interfaces/banner.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss','../../../../shared/bootstrap.min.css','../../../../shared/homestyle.scss']
})
export class AuthorsComponent implements OnInit {
  
  
  constructor() { }

  ngOnInit(): void {
  }
}
