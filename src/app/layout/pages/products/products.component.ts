import { Component, OnInit } from '@angular/core';
import { product } from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productList!:product[]
  constructor(private _ProductService:ProductService,private _CartService:CartService,private toastr: ToastrService){}  ngOnInit(): void {
    if(typeof localStorage!='undefined'){
      localStorage.setItem('currerntPage','/products');
      this.getAllProduct();
    }
    }
    getAllProduct(){

    this._ProductService.getAllProduct().subscribe({
      next:res=>{
        this.productList=res.data;
        console.log(this.productList);


      },
      error:err=>{
        console.log(err);


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
