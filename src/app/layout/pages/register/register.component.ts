import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  erorMsg!:string;
  isLoading:boolean=false;
registerForm:FormGroup=new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{8,}$/)]),
  rePassword:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
},this.checkRePsswordMatch);
constructor(private _AuthService:AuthService,private _Router:Router){

}

checkRePsswordMatch(g:AbstractControl){
  if(g.get('password')?.value===g.get('rePassword')?.value){
    return null;
  }
  else{
    g.get('rePassword')?.setErrors({misMatch:true});
    return {misMatch:true};
  }
}

submitRegister(){

  if(this.registerForm.valid){
    this.isLoading=true;
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
         console.log(res);
         this._Router.navigate(['/login'])
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
