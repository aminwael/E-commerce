import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  //ha3ml dependency injection gwa method
  let _AuthService:AuthService=inject(AuthService);
  let _Router:Router=inject(Router)
  if(_AuthService.userData()!=null){
  return true;
  }
  //navigate  login page
  _Router.navigate(['/login'])
  return false;
  }
