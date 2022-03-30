import { AuthService } from './../../../service/auth.service';
import { IUser } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm:FormGroup;
  showPassword: boolean = true;

  constructor( private signUpFormBuilder: FormBuilder,
               private authService: AuthService ) {
    this.signUpForm = this.signUpFormBuilder.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email: ['', [ Validators.required, Validators.email] ],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }
  onSubmit( firstname:any, lastname:any, email:any, password:any){
    const user:IUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    this.authService.signUp(user).subscribe((res) => {
      alert(res);
    })
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
