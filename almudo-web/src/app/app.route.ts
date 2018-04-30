import { Routes, RouterModule } from '@angular/router';
import { AppCanactiveService } from './services/app-canactive.service';

const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: 'app/modules/hotels/hotels.module#HotelsModule',
        canActivate: [AppCanactiveService]
    },
    { path: '**', pathMatch: 'full', redirectTo: '/' }
];

export const routes = RouterModule.forRoot(APP_ROUTES, { useHash: true });
