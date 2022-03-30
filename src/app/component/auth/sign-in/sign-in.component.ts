import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm:FormGroup;
  showPassword: boolean = true;

  constructor( private signInFormBuilder: FormBuilder,
               private authService: AuthService ) {
    this.signInForm = this.signInFormBuilder.group({
      email: ['', [ Validators.required, Validators.email] ],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }
  onSubmit( email:any, password:any){
    const user:IUser = {
      email: email,
      password: password
    }
    this.authService.signIn(user).subscribe();
  }

  inputTypePassword(): string {
    if (this.showPassword) {
      return 'password';
    }
    return 'text';
  }

  showPasswordType(){
      this.showPassword = !this.showPassword;
    }

}