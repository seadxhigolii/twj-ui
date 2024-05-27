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

@Component({
  selector: 'app-blog-posts-create',
  templateUrl: './blog-posts-create.component.html',
  styleUrls: ['./blog-posts-create.component.scss']
})
export class BlogPostsCreateComponent implements OnInit {
  blogPost: BlogPostDTO = new BlogPostDTO();

  toneList: ToneType[] = [];
  categoryList: CategoryDTO[] = [];
  productList: ProductDTO[] = [];
  seoKeywordList: SEOKeyowrdDTO[] = [];
  targetAudienceList: TargetAudience[] = [];
  selectedLength: 'Short' | 'Medium' | 'Long' = 'Medium';
  
  constructor(private blogPostService: BlogpostService,
    private categoryService : CategoryService,
    private productService : ProductService,
    private seoKeywordService : SEOKeywordService,
    private router: Router) { 
    }

  blogPostBody : string;
  ngOnInit(): void {
    this.initializeTones();
    this.initializeCategories();
    this.initializeProducts();
    this.initializeSEOKeywords();
    this.initializeTargetAudiences();
  }
  
  navigateToBlogPostsCreate(): void {
    this.router.navigate(['/blog-posts-create']);
  }

  initializeFormData(): void {
    this.blogPost = {
      topic: '',
      tone: '',
      targetAudience: '',  
      creativityLevel: 1, 
      categoryId: '',
      productId: '',
      keywords: [],
      lengthPreference: 'Medium' 
    };
  }

  initializeTones() {
    this.toneList = [
      { name: 'Informative', description: 'Focused on delivering factual and useful information to the reader. Best for educational content or when explaining complex topics.' },
      { name: 'Conversational', description: 'A friendly and engaging tone, as if the writer is speaking directly to the reader. Great for blogs aiming to create a personal connection with the audience.' },
      { name: 'Persuasive', description: 'Aimed at convincing the reader about a particular viewpoint or encouraging them to take a specific action.' },
      { name: 'Professional', description: 'A formal tone that conveys expertise and authority. Suitable for business or academic content.' },
      { name: 'Inspirational', description: 'Designed to motivate and uplift the reader. Ideal for content that aims to inspire positive changes.' },
      { name: 'Entertaining', description: 'A light-hearted and amusing tone, often incorporating humor. Perfect for lifestyle blogs or personal stories.' },
      { name: 'Reflective', description: 'A thoughtful and introspective tone, encouraging readers to consider deeper meanings or personal implications.' },
      { name: 'Skeptical', description: 'A questioning and critical tone, useful for content that aims to analyze or critique thoroughly.' },
      { name: 'Optimistic', description: 'A positive and hopeful tone, emphasizing the good aspects or potential positive outcomes.' },
      { name: 'Urgent', description: 'A tone that conveys a sense of immediacy or importance, compelling the reader to pay attention or act quickly.' },
    ];
  }

  initializeTargetAudiences() {
    this.targetAudienceList = [
      { name: 'Teenagers', description: 'Content tailored for young adults navigating through their teenage years, focusing on topics like education, relationships, and self-discovery.' },
      { name: 'Parents', description: 'Articles aimed at parents, covering a wide range of topics from child-rearing practices to managing work-life balance.' },
      { name: 'Entrepreneurs', description: 'Focused on the needs and interests of entrepreneurs and small business owners, with content ranging from startup advice to growth strategies.' },
      { name: 'Fitness Enthusiasts', description: 'For individuals passionate about health and fitness, including workout tips, nutrition advice, and wellness strategies.' },
      { name: 'Tech Savvy', description: 'Geared towards those interested in the latest technology trends, gadgets, and IT solutions.' },
      { name: 'Travelers', description: 'Aimed at individuals who love to explore new places, offering travel tips, destination guides, and cultural insights.' },
      { name: 'Foodies', description: 'For culinary enthusiasts interested in recipes, restaurant reviews, and gastronomy trends.' },
      { name: 'Students', description: 'Catering to the academic and lifestyle interests of students at various levels of education.' },
      { name: 'Professionals', description: 'Content focused on career development, industry trends, and professional skills enhancement.' },
      { name: 'Creative Minds', description: 'Targeting artists, writers, and creative individuals, with content on creativity, inspiration, and cultural arts.' },
    ];
  }


  initializeCategories() {
    this.categoryService.getAll().subscribe(result =>{
      this.categoryList = result as CategoryDTO[];
    })
  }  

  initializeProducts() {
    this.productService.getAll().subscribe(result =>{
      this.productList = result as ProductDTO[];
    })
  }

  initializeSEOKeywords() {
    this.seoKeywordService.getAll().subscribe(result =>{
      this.seoKeywordList = result as SEOKeyowrdDTO[];
    })
  }

  setSelectedLength(length: 'Short' | 'Medium' | 'Long'): void {
    this.selectedLength = length;
  }

  submitForm(): void {
    const formData: BlogPostDTO = {
      topic: this.blogPost.topic,
      tone: this.blogPost.tone, 
      targetAudience: this.blogPost.targetAudience, 
      categoryId: this.blogPost.categoryId,
      productId: this.blogPost.productId,
      creativityLevel: this.blogPost.creativityLevel,
      keywords: this.blogPost.keywords,
      lengthPreference: this.selectedLength,
    };
    
    this.blogPostService.generateRandom().subscribe(response=>{
    });
  }
}
