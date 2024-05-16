import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SEOKeywordService } from 'src/app/services/seokeyword.service';
import { BlogPostDTO } from 'src/shared/dto/blog-post.dto';
import { CategoryDTO } from 'src/shared/dto/category.dto';
import { ProductDTO } from 'src/shared/dto/product.dto';
import { SEOKeyowrdDTO } from 'src/shared/dto/seokeyword.dto';
import { TargetAudience } from 'src/shared/interfaces/target-audience.interface';
import { ToneType } from 'src/shared/interfaces/toneType.interface';
import { Vendor } from 'src/shared/interfaces/vendos.interface';
import { Response } from 'src/shared/interfaces/responses/response.interface';



@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss'],
})
export class ProductsCreateComponent implements OnInit {

  blogPost: BlogPostDTO = new BlogPostDTO();
  product: ProductDTO = new ProductDTO();

  vendorList: Vendor[] = [];
  categoryList: CategoryDTO[] = [];
  productList: ProductDTO[] = [];
  seoKeywordList: SEOKeyowrdDTO[] = [];
  targetAudienceList: TargetAudience[] = [];
  selectedLength: 'Short' | 'Medium' | 'Long' = 'Medium';
  
  constructor(private productService: ProductService,
    private categoryService : CategoryService,
    private router: Router) { 
    }

  blogPostBody : string;
  ngOnInit(): void {
    this.initializeTones();
    this.initializeCategories();
  }
  
  navigateToProductList(): void {
    this.router.navigate(['/products']);
  }

  initializeTones() {
    this.vendorList = [
      { name: 'Amazon', description: 'Amazon' },
      { name: 'ClickBank', description: 'ClickBank'},
    ];
  }


  initializeCategories() {
    this.categoryService.getAll().subscribe(result =>{
      this.categoryList = result as CategoryDTO[];
    })
  }  

  setSelectedLength(length: 'Short' | 'Medium' | 'Long'): void {
    this.selectedLength = length;
  }

  addCategory() {
    this.router.navigate(['/products-category-create']);
  }

  submitForm(): void {
    const formData: ProductDTO = {
      productName: this.product.productName,
      description: this.product.description, 
      image: this.product.image, 
      categoryId: this.product.categoryId,
      // vendorName: this.product.vendorName,
      affiliateLink: this.product.affiliateLink
    };

    this.productService.add(formData).subscribe(
      (response: Response<boolean>) => {
        this._reloadPage();
      },
      (error) => {
        
        console.log('Error occurred:', error);
      }
    );
  }

  private _reloadPage(): void {
    window.location.reload();
  }

}
