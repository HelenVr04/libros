import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-agregar-libro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-libro.component.html',
  styleUrl: './agregar-libro.component.css'
})
export class AgregarLibroComponent implements OnInit {

  libroForm: FormGroup = new FormGroup({});
  enviado: boolean = false;

  // ✅ Aquí estaba el problema antes: esta propiedad debe estar declarada en la clase
  opcionesRecomendado = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private libroService: LibroService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  mainForm() {
    this.libroForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      editorial: ['', [Validators.required]],
      recomendado: ['', [Validators.required]]
    });
  }

  get myForm() {
    return this.libroForm.controls;
  }

  onSubmit() {
    this.enviado = true;
    if (!this.libroForm.valid) {
      console.log('Formulario inválido', this.libroForm.value);
      return;
    }

    console.log('Formulario válido, datos:', this.libroForm.value);

    this.libroService.agregarLibro(this.libroForm.value).subscribe({
      next: (res) => {
        console.log('Libro agregado correctamente', res);
      },
      error: (e) => {
        console.error('Error al agregar libro:', e);
      },
      complete: () => {
        console.log('Registro completado');
        this.ngZone.run(() => this.router.navigateByUrl('/listar-libros'));
      }
    });
  }
}
