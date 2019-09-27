import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'list-player', loadChildren: './pages/list-player/list-player.module#ListPlayerPageModule' },
  { path: 'perfil-player', loadChildren: './pages/perfil-player/perfil-player.module#PerfilPlayerPageModule' },
  { path: 'add-game', loadChildren: './pages/add-game/add-game.module#AddGamePageModule' },
  { path: 'list-game', loadChildren: './pages/list-game/list-game.module#ListGamePageModule' },
  { path: 'perfil-game', loadChildren: './pages/perfil-game/perfil-game.module#PerfilGamePageModule' },
  { path: 'list-list-game', loadChildren: './pages/list-list-game/list-list-game.module#ListListGamePageModule' },
  // { path: 'add-player', loadChildren: './pages/add-player/add-player.module#AddPlayerPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
