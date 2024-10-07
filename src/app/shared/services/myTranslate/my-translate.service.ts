import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  constructor(private _TranslateService:TranslateService , @Inject(PLATFORM_ID)  platformId:object) {
   if(isPlatformBrowser(platformId)){
    let defaultLang='en';
    let savedLang=localStorage.getItem('lang');
    if(savedLang){
      defaultLang=savedLang;
    }
   _TranslateService.setDefaultLang(defaultLang);
   _TranslateService.use(defaultLang);
   this.changeDirection(defaultLang);
   }
   }
  changeDirection(lang:string){
    if(lang=='en'){
      document.dir='ltr'
    }
    else if(lang=='ar'){
       document.dir='rtl'
    }
  }
  changeLang(lang:string){
    localStorage.setItem('lang',lang)
    this._TranslateService.setDefaultLang(lang);
    this._TranslateService.use(lang);
    this.changeDirection(lang);
  }
}
