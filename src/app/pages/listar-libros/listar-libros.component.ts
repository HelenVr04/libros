import { Component,OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listar-libros',
  imports: [RouterLink],
  templateUrl: './listar-libros.component.html',
  styleUrl: './listar-libros.component.css'
})
export class ListarLibrosComponent implements OnInit{

  //propiedades
  libros: any = [];

  constructor(private libroService: LibroService){
    this.getLibros();
  }
  ngOnInit(): void {}

  //método que hace la petición al service para obtener los empleados 
  getLibros(){
    this.libroService.getLibros().subscribe((data)=>{
      this.libros = data
    });
  }

  //método para eliminar un empleado
  eliminarLibro(libro:any,index:any){
    if(window.confirm('¿Estás seguro de que deseas eliminar este libro?')){
      this.libroService.eliminarLibro(libro._id).subscribe((data)=>{
        this.libros.splice(index, 1);
      })
    }
  }

}
