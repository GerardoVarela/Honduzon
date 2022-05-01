import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingPageComponent } from './products/pages/landing-page/landing-page.component';
import { RestorePageComponent } from './products/pages/restore-page/restore-page.component';
import { ProductsListPageComponent } from "./products/pages/products-list-page/products-list-page.component";
import { ProductDetailsPageComponent } from './products/pages/product-details-page/product-details-page.component';
import { UserDetailsPageComponent } from './products/pages/user-details-page/user-details-page.component';
import { ChatPageComponent } from './products/pages/chat-page/chat-page.component';
import { AdminModulePageComponent } from './products/pages/admin-module-page/admin-module-page.component';

const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'restore',
        component: RestorePageComponent,
    },
    {
        path: 'product',
        component: ProductsListPageComponent,
    },
    {
        path: 'product/:id_product/detail',
        component: ProductDetailsPageComponent,
    },
    {
        path: 'chat/user/:id_user',
        component: ChatPageComponent,
    },
    {
        path: 'profile/user/:id_user',
        component: UserDetailsPageComponent,
    },
    {
        path: 'home/admin',
        component: AdminModulePageComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}