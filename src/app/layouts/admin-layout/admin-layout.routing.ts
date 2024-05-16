import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { BlogPostsComponent } from 'src/app/pages/blog-posts/blog-posts.component';
import { TemplatesComponent } from 'src/app/pages/templates/templates.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { TemplatesCreateComponent } from 'src/app/pages/templates-create/templates-create.component';
import { TemplatesEditComponent } from 'src/app/pages/templates-edit/templates-edit.component';
import { ProductsEditComponent } from 'src/app/pages/products-edit/products-edit.component';
import { ProductsCreateComponent } from 'src/app/pages/products-create/products-create.component';
import { BlogPostsCreateComponent } from 'src/app/pages/blog-posts-create/blog-posts-create.component';
import { ProductsCategoryCreateComponent } from 'src/app/pages/products-category-create/products-category-create.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'blog-posts',           component: BlogPostsComponent },
    { path: 'blog-posts-create',           component: BlogPostsCreateComponent },
    { path: 'templates',           component: TemplatesComponent },
    { path: 'templates-create',           component: TemplatesCreateComponent },
    { path: 'templates-edit',           component: TemplatesEditComponent },
    { path: 'products',           component: ProductsComponent },
    { path: 'products-edit',           component: ProductsEditComponent },
    { path: 'products-create',           component: ProductsCreateComponent },
    { path: 'products-category-create',           component: ProductsCategoryCreateComponent },
];
