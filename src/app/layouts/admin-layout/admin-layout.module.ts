import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogPostsComponent } from 'src/app/pages/blog-posts/blog-posts.component';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { TemplatesCreateComponent } from 'src/app/pages/templates-create/templates-create.component';
import { TemplatesEditComponent } from 'src/app/pages/templates-edit/templates-edit.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductsCreateComponent } from 'src/app/pages/products-create/products-create.component';
import { ProductsEditComponent } from 'src/app/pages/products-edit/products-edit.component';
import { BlogPostsCreateComponent } from 'src/app/pages/blog-posts-create/blog-posts-create.component';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { GenericDropdownComponent } from '../generic-dropdown/generic-dropdown.component';
import { GenericMultiDropdownComponent } from '../generic-multi-dropdown/generic-multi-dropdown.component';
import { ProductsCategoryCreateComponent } from 'src/app/pages/products-category-create/products-category-create.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    BlogPostsComponent,
    TemplatesComponent,
    TemplatesCreateComponent,
    TemplatesEditComponent,
    ProductsComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
    ProductsCategoryCreateComponent,
    BlogPostsCreateComponent,
    GenericTableComponent,
    GenericDropdownComponent,
    GenericMultiDropdownComponent
  ],
  exports: [
    GenericTableComponent,
    GenericDropdownComponent,
    GenericMultiDropdownComponent
  ]
})

export class AdminLayoutModule {}
