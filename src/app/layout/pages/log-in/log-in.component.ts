import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  erorMsg!:string;
  isLoading:boolean=false;
loginForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
});
constructor(private _AuthService:AuthService,private _Router:Router){

}


submitLogin(){

  if(this.loginForm.valid){
    this.isLoading=true;
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
         console.log(res);
         localStorage.setItem('userToken',res.token);
         this._AuthService.decodeUserData();
         this._Router.navigate(['/home'])
      },

      error:(err)=>{
        this.isLoading=false;
        console.log(err);
        this.erorMsg=err.error.message;

      }

    })
    //connect api
  }
}
}
