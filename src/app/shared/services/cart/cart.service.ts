import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { CartRes } from '../../interfaces/cart';
import { count } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userTokenHeaders={
    token:localStorage.getItem('userToken') || ''
  }
  constructor(private _HttpClient:HttpClient) { }
  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/cart`, {productId:productId})
  }
  getLoggedUserCart():Observable<CartRes>{
    return this._HttpClient.get<CartRes>(`${Environment.baseURL}/api/v1/cart`)
  }
  updateProductCartQuantity(productId:string , count:string):Observable<CartRes>{
    return this._HttpClient.put<CartRes>(`${Environment.baseURL}/api/v1/cart/${productId}`,{count:count}
    )
  }
  removeProductFromCart(productId:string):Observable<CartRes>{
    return this._HttpClient.delete<CartRes>(`${Environment.baseURL}/api/v1/cart/${productId}`)
  }
}
