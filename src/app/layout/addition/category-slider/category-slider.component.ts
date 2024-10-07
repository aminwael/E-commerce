import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../shared/interfaces/product';
import { CategoryService } from './../../../shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule,NgFor,NgIf],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit{
  isLoading:boolean=false;
  customOptions: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },
    },
    nav: true
  }

  categoryList!:Category[]
constructor(private _CategoryService:CategoryService){}
ngOnInit(): void {
  this.getAllCategories()
}
getAllCategories(){
  this.isLoading=true;
  this._CategoryService.getAllCategories().subscribe({
    next:res=>{
      this.categoryList=res.data
      console.log(this.categoryList);
      this.isLoading=false;

    },
    error:err=>{
      console.log(err);
      this.isLoading=false;
    }
  })
}
}
