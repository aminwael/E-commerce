import {Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { log } from 'console';
import { product } from '../../../shared/interfaces/product';
import { CurrencyPipe, LowerCasePipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { CategoriesComponent } from "../categories/categories.component";
import { CategorySliderComponent } from '../../addition/category-slider/category-slider.component';
import { HomeSliderComponent } from "../../addition/home-slider/home-slider.component";
import { RouterLink } from '@angular/router';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,NgFor, NgIf, CategoriesComponent, CategorySliderComponent, OnsalePipe,SearchPipe,HomeSliderComponent,LowerCasePipe,CurrencyPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userWord:string='';
  isLoading:boolean=false;
  productList!:product[]
  constructor(private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService){
  }
ngOnInit(): void {
if(typeof localStorage!='undefined')
  localStorage.setItem('currentPage','/home');

this.getAllProduct();
}
getAllProduct(){
  this.isLoading=true;
this._ProductService.getAllProduct().subscribe({
  next:res=>{
    this.productList=res.data;
    console.log(this.productList);
    this.isLoading=false;

  },
  error:err=>{
    console.log(err);
    this.isLoading=false;

  }
})
}

//blugin asmha toaster
addProducToCart(productId:string){
  this._CartService.addProductToCart(productId).subscribe({
    next:res=>{
      console.log(res);
      this.toastr.success(res.message,'', {
        progressBar:true
      });

    }
  })
}
}
