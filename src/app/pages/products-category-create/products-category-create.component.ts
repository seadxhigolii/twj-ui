import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SEOKeywordService } from 'src/app/services/seokeyword.service';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';
import { CategoryDTO } from 'src/shared/dto/category.dto';
import { ProductCategoryDTO } from 'src/shared/dto/product-category.dto';
import { ProductDTO } from 'src/shared/dto/product.dto';
import { SEOKeyowrdDTO } from 'src/shared/dto/seokeyword.dto';
import { TargetAudience } from 'src/shared/interfaces/target-audience.interface';
import { ToneType } from 'src/shared/interfaces/toneType.interface';

@Component({
  selector: 'app-products-category-create',
  templateUrl: './products-category-create.component.html',
  styleUrls: ['./products-category-create.component.scss']
})
export class ProductsCategoryCreateComponent implements OnInit {

  blogPost: BlogPostDTO = new BlogPostDTO();
  category: ProductCategoryDTO = new ProductCategoryDTO();
  
  constructor(
    private categoryService : CategoryService,
    private router: Router) { 
    }
  ngOnInit(): void {
  }
  
  navigateToProductsCreate(): void {
    this.router.navigate(['/products-create']);
  }

  submitForm(): void {
    const formData: ProductCategoryDTO = {
      name: this.category.name,
      description: this.category.description,
    };
    this.categoryService.add(formData).subscribe();
  }


}
