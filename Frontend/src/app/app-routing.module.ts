import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingPageComponent } from './products/pages/landing-page/landing-page.component';
import { RestorePageComponent } from './products/pages/restore-page/restore-page.component';

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