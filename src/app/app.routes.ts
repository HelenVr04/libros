import { Routes } from '@angular/router';
import { AgregarLibroComponent } from './pages/agregar-libro/agregar-libro.component';
import { EditarLibroComponent } from './pages/editar-libro/editar-libro.component';
import { ListarLibrosComponent } from './pages/listar-libros/listar-libros.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-libro'
    },
    {
        path:'agregar-libro',
        component: AgregarLibroComponent
    },
    {
        path: 'editar-libro/:id',
        component: EditarLibroComponent
    },
    {
        path: 'listar-libros',
        component: ListarLibrosComponent
    },
    {
        path: '**',
        redirectTo: 'listar-libros'
    }
];
