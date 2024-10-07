import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable, signal, WritableSignal } from '@angular/core';
import { dataRegister, email, logInData } from '../../../shered/interfaces/data';
import {Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   userData:WritableSignal<any>=signal(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
  // be3ml run 3la el browser bs
  afterNextRender(()=>{
    if(localStorage.getItem('userToken')){
      this.decodeUserData();
      // _Router.navigate([localStorage.getItem('currentPage')]);
    }
  })
   }
  signUp(data:dataRegister):Observable<any>{
   return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signup`,data)
  }
  signIn(data:logInData):Observable<any>{
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signin`,data)
   }


   forgetPassword(data:email):Observable<any>{
   return this._HttpClient.post('${Environment.baseURL}/api/v1/auth/forgotPasswords',data)
}

   //mmkn lw 3ayz a3ml check an el user 3aml login aw la mn 5lal if condition 3la localstorage feha value aw las
   decodeUserData(){
    // this.userData=new BehaviorSubject(null)
    //ba3rf el user 3aml login aw la mn 5lal el token
    //decode token (hafok tashfer el data)
    const token=JSON.stringify(localStorage.getItem('userToken'));
    const decoded=jwtDecode(token);


    //3ashan a7ot data gwa behaviorSubject
    this.userData.set(decoded);
    //3ashan ageb data mn behaviorSubject
    console.log(this.userData());

   }
   logOut(){
    localStorage.removeItem('userToken');
    this.userData.set(null);
    this._Router.navigate(['/login'])
   }
}
