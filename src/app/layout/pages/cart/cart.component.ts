import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  errMsg!:string;
  data!:Data;
  constructor (private CartService:CartService){}
  ngOnInit(): void {
    if(typeof localStorage!='undefined'){
      localStorage.setItem('currentPage','/cart');
      this.getLoggedUserCart();
    }
    }
    getLoggedUserCart(){
      this.CartService.getLoggedUserCart().subscribe({
        next:res=>{
          this.data=res.data
          console.log(this.data);

        },
        error:err=>{
          this.errMsg=err.error.message;

        }
      })
    }
    updateProductCartCount(productId:string,count:number){
      if(count<=0){
        //call method remove from cart
        this.deleteProductFromCart(productId)
      }
      else{
        this.CartService.updateProductCartQuantity(productId,count.toString()).subscribe({
          next:res=>{
            console.log(res);
            this.data=res.data;
          }
        })
      }

    }
    deleteProductFromCart(productId:string){
      this.CartService.removeProductFromCart(productId).subscribe({

        next:res=>{
          console.log(res);
          this.data=res.data;
        }
      })
    }
}
