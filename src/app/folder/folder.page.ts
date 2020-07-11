import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApiService } from '../providers/news-api.service';
import { COUNTRIES } from '../providers/mock-countries';
import { CATEGORIES } from '../providers/mock-categories';
import { WidgetUtilService } from '../providers/widget-util.service';
import {Storage} from '@ionic/storage';
import { HelperService } from './../providers/helper.service';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  articleList: Array<any> = [];
  showPageLoader = false;
  countriesList: Array<any> = COUNTRIES;
  selectedCountry = COUNTRIES[0];
  categoryList: Array<any> = CATEGORIES;
  selectedCategory = CATEGORIES[0];


  constructor(private activatedRoute: ActivatedRoute, private newsApiService: NewsApiService, private widgetUtilService: WidgetUtilService, private router: Router, private storage: Storage, private helperService: HelperService) {
   this.getTopHead(this.selectedCountry.code, this.selectedCategory.id);
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  getTopHead(countryCode: string, countryId: string){
    this.showPageLoader = true;
    this.newsApiService.getTopHeadlines(countryCode, countryId).subscribe((result: any) => {
      console.log('result', result);
      this.articleList = result.articles.filter(article => article.urlToImage);
      this.showPageLoader = false;
    }, (error) => {
      console.log('error', error);
      this.showPageLoader = false;
      this.widgetUtilService.presentToast(error.statusText);
    });
  }

  handleChange(){
      console.log(this.selectedCountry, this.selectedCategory);
      this.getTopHead(this.selectedCountry.code, this.selectedCategory.id);
  }

 async openNewsDetailPage(article){
  await this.storage.set('currentArticle', article);
  this.router.navigate(['/news-detail']);
  }

  async saveArticle(article) {
    try {
      await this.helperService.saveArticle(article);
      this.widgetUtilService.presentToast('Article Saved Successfully');
    } catch (error) {
      this.widgetUtilService.presentToast(error.message);
    }
  }

  doRefresh(event) {

    this.getTopHead(this.selectedCountry.code, this.selectedCategory.id);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
