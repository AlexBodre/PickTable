import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.registerForm.validator = this.validatePassword;
    //   this.registerForm = this.fb.group({
    //     name: ['', Validators.required],
    //     email: ['', Validators.required, Validators.email],
    //     password: ['', Validators.required, Validators.minLength(6)],
    //     confirmPassword: ['', [Validators.required,  Validators.minLength(6)]]
    //   },
    //   {
    //     validator: this.validatePassword
    //   }
    // );
  }

  async onRegister() {
    const { name, email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.registro(email, password, name);
      if (user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  validatePassword(frm: FormGroup) {
    return frm.controls['password'].value ===
      frm.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  getError(controlName: string) {
    let error = '';
    let control = this.registerForm.controls[controlName];
    if (control.touched && control.errors != null) {
      switch (controlName) {
        case 'name':
          error = 'El campo nombre completo es requerido';
          break;
        case 'email':
          error = 'El campo email no es valido';
          break;
        case 'password':
          if (control.errors.minlength) {
            error = 'El campo contraseña debe ser al menos 6 caracteres';
          } else {
            error = 'El campo contraseña es requerido';
          }
          break;
        case 'confirmPassword':
          if (control.errors.minlength) {
            error = 'El campo contraseña debe ser al menos 6 caracteres';
          } else {
            error = 'El campo confirmar contraseña es requerido';
          }
          break;
      }

      if (
        this.registerForm.errors.mismatch == true &&
        controlName == 'confirmPassword'
      ) {
        error = 'Las contraseñas no coinciden';
      }

      return error;
    }
  }
}
