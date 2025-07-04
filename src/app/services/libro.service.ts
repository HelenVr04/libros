import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
//atributos
  baseUri: string = 'https://web-service-bd-aqy4.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }

  
  //metodo para agregar un libro
agregarLibro(data: any): Observable<any> {
  let url = `${this.baseUri}/agregar`; // ESTA
  return this.http.post(url, data, { headers: this.headers })
    .pipe(catchError(this.errorManager));
}

  //metodo para obtener todos los libros
  getLibros(){
    let url = `${this.baseUri}/libros`;
    return this.http.get(url);

  }

  //obtener a un solo libro por su ID
  getLibro(id:any) : Observable<any>{
    let url = `${this.baseUri}/libro/${id}`;
    return this.http.get(url, {headers: this.headers})
    .pipe(map((res:any) =>{
      return res || {};
    }),
    catchError(this.errorManager)
    );
  }

  //actualizar un libro
  actualizarLibro(id:any, data:any) : Observable<any>{
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, {headers: this.headers})
    .pipe(catchError(this.errorManager));
  }


  //eliminar un libro
  eliminarLibro(id:any) : Observable<any>{
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, {headers: this.headers})
    .pipe(catchError(this.errorManager));
  }

  //manejador de errores 
  errorManager(error: HttpErrorResponse){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      //el error esta del lado del cliente
      errorMessage = error.error.message;
    }else{
      //el error esta del lado del server
      errorMessage = `Error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(()=>{
      return errorMessage
    });
  }

}
