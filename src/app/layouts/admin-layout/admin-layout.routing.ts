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
import { BlogPostEditComponent } from 'src/app/pages/blog-post-edit/blog-post-edit.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent, canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent, canActivate: [AuthGuard] },
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'blog-posts',           component: BlogPostsComponent, canActivate: [AuthGuard] },
    { path: 'blog-posts-create',           component: BlogPostsCreateComponent, canActivate: [AuthGuard] },
    { path: 'blog-posts-edit/:id',           component: BlogPostEditComponent, canActivate: [AuthGuard] },
    { path: 'templates',           component: TemplatesComponent, canActivate: [AuthGuard] },
    { path: 'templates-create',           component: TemplatesCreateComponent, canActivate: [AuthGuard] },
    { path: 'templates-edit',           component: TemplatesEditComponent, canActivate: [AuthGuard] },
    { path: 'products',           component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'products-edit',           component: ProductsEditComponent, canActivate: [AuthGuard] },
    { path: 'products-create',           component: ProductsCreateComponent, canActivate: [AuthGuard] },
    { path: 'products-category-create',           component: ProductsCategoryCreateComponent, canActivate: [AuthGuard] },
];
