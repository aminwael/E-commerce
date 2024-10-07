import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from '../../../shared/services/order/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss'
})
export class ShippingAddressComponent {
  shippingAddressForm:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })
  constructor(private _OrderService:OrderService,private _ActivatedRoute:ActivatedRoute){}
  submitShippingAddressForm(){
    if(this.shippingAddressForm.valid){
      this._ActivatedRoute.paramMap.subscribe({
        next:p=>{
          this._OrderService.checkOut(p.get('cartId')!,this.shippingAddressForm.value).subscribe({
            next:res=>{
              window.open(res.session.url,'_self')

            }
          })

        }
      })
    }

  }

}
