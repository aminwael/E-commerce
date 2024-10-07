import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product, productRes } from '../../interfaces/product';
import { Environment } from '../../../base/Environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  getAllProduct():Observable<productRes>{
  return  this._HttpClient.get<productRes>(`${Environment.baseURL}/api/v1/products`)
  }
  getProductByID(prodcutId:string):Observable<{data:product}>{
    return this._HttpClient.get<{data:product}>(`${Environment.baseURL}/api/v1/products/${prodcutId}`)
  }
  getAllPosts():Observable<any>{
   return this._HttpClient.get('https://jsonplaceholder.typicode.com/posts')
  }
  getAllUsers():Observable<any>{
    return this._HttpClient.get('https://jsonplaceholder.typicode.com/users')
   }
   getUserById(userId:string):Observable<any>{
   return this._HttpClient.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
   }
   getMoviesByName(m:string):Observable<any>{
   return this._HttpClient.get(`https://www.omdbapi.com/?i=${m}&apikey=6dbca54a`)
   }
}
