import { ChangeDetectionStrategy, Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data } from '../../../shared/interfaces/cart';



@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit{
price :WritableSignal<number>=signal<number>(20);
quan:WritableSignal<number>=signal(10);
totalPrice:Signal<number>=computed(()=>{
  return this.price() * this.quan()
})
counter:WritableSignal<number>=signal<number>(0);
userName:WritableSignal<string>=signal<string>('amin wael')
constructor(){}

  ngOnInit(): void {
    if(typeof localStorage!='undefined'){
      localStorage.setItem('currentPage','/categories');


    }
    }
 setCounter(){
  this.counter.update((res)=>{
    return res+1
  })
}
setName(){
  this.userName.set('ahmed ali')
}
changePrice(){
  this.price.set(50);
}
}
