import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/auth.action';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { RouterLink } from '@angular/router';
import { selectSubmitting } from '../../store/auth.selectors';
import { AuthStateInterface } from '../../types/authState.interface';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>
  ) {}

  isSubmitting$!: ReturnType<Store<{ auth: AuthStateInterface }>['select']>;

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });

    this.isSubmitting$ = this.store.select(selectSubmitting);
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(register({ request }));
  }
}
