import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { address } from '../../../shered/interfaces/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userTokenHeaders={
    token:localStorage.getItem('userToken') || ''
  }
  constructor(private _HttpClient:HttpClient) { }
  checkOut(cardId:string,data:address):Observable<any>{
   return this._HttpClient.post(`${Environment.baseURL}/api/v1/orders/checkout-session/${cardId}?url=${Environment.baseUrlWebsite}`,{
      shippingAddress:data
    }
  )
  }
}
