import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../models/libro.model';

@Component({
  selector: 'app-editar-libro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-libro.component.html',
  styleUrl: './editar-libro.component.css'
})
export class EditarLibroComponent implements OnInit {

  libroForm: FormGroup = new FormGroup({});
  enviado: boolean = false;

  // opciones para el select de recomendado
  opcionesRecomendado = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
  ];

  libroData: Libro[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private libroService: LibroService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mainForm();
    const id = this.actRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getLibro(id);
    }
  }

  // método para generar el formulario
  mainForm() {
    this.libroForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      editorial: ['', [Validators.required]],
      recomendado: ['', [Validators.required]]
    });
  }

  // getter para acceder fácil a los controles del formulario
  get myForm() {
    return this.libroForm.controls;
  }

  // obtener libro por ID y cargarlo en el formulario
  getLibro(id: any) {
    this.libroService.getLibro(id)
      .subscribe((data) => {
        this.libroForm.setValue({
          titulo: data['titulo'],
          autor: data['autor'],
          editorial: data['editorial'],
          recomendado: data['recomendado']
        });
      });
  }

  // método al enviar el formulario
  onSubmit() {
    this.enviado = true;
    if (!this.libroForm.valid) {
      console.log('Formulario inválido', this.libroForm.value);
      return false;
    } else {
      if (window.confirm('¿Seguro que deseas modificar este libro?')) {
        const id = this.actRoute.snapshot.paramMap.get('id');
        this.libroService.actualizarLibro(id, this.libroForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listar-libros');
              console.log('Se actualizó correctamente');
            },
            error: (e) => {
              console.log(e);
            }
          });
      }else{
        this.router.navigateByUrl('/listar-libros')
      }
      return;
    }
  }
}
