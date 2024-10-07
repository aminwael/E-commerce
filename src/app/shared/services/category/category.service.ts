import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { CategoryRes } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient:HttpClient) { }
  getAllCategories():Observable<CategoryRes>{
  return this._HttpClient.get<CategoryRes>(`${Environment.baseURL}/api/v1/categories`)
  }
}
