import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { concatMap, debounce, debounceTime, delay, distinctUntilChanged, filter, fromEvent, interval, map, mergeAll, mergeMap, Observable, of, Subject, switchAll, switchMap, timer } from 'rxjs';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,AfterViewInit{
  list!:any[ ]
  users= of ({id:"1",salary:5000})
  imgUrl= of ('https//loremflickr.com/500/500/')
  cities= of (
    {name:'cairo' , t:1000},
    {name:'alex', t:0},
    {name:'giza', t:3000},
    {name:'paris', t:200},
    {name:'london', t:4000},
    {name:'korea', t:500},
  )
  destroy=new Subject();
  form:FormGroup=new FormGroup({
    name:new FormControl()
  })
  constructor(private _ProductService:ProductService){}
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement,'keyup').pipe(
      map((res:any)=>{
        return res.target.value
      }),
      //btshel ay tekrar
      distinctUntilChanged(),
      debounceTime(2000),
      switchMap(searchValue=>{
        //inner observable
        return this._ProductService.getMoviesByName(searchValue)
      }),
      map(res=>{
        return res.search
      })
    )
    .subscribe({
      next:(res:any)=>{
        console.log(res);
        this.list=res

      }
    })
  }
  w=interval(1000);
  z=timer(5000,1000)
    //rxjs
  names=new Observable(function(x){
    x.next('amin'),
    x.next('mo'),
    x.next('nour'),
    x.error('error from names')
    x.next('zozo'),
    x.next('zizo'),
    x.next('wael'),
    x.complete()

  })
  @ViewChild('searchInput') searchInput!:ElementRef;
  ngOnInit(): void {





    if(typeof localStorage!='undefined'){
      localStorage.setItem('currentPage','/brands');
    }
    }

}
