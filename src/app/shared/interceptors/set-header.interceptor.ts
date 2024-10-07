import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
if(typeof localStorage !="undefined"){
  if(localStorage.getItem('userToken')){
    let userTokenHeader={
      token:localStorage.getItem('userToken')!
    }
     if(req.url.includes('cart') || req.url.includes('order') || req.url.includes('wishlist')){
    //ha5od nos5a mn el req
    req=req.clone({
      setHeaders:userTokenHeader
    })
   }
  }
}
  return next(req);
};
