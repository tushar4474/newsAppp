import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsApiService } from '../providers/news-api.service';
import { WidgetUtilService } from '../providers/widget-util.service';
import { Storage } from '@ionic/storage';
import { HelperService } from './../providers/helper.service';

@Component({
  selector: 'app-publisher-news',
  templateUrl: './publisher-news.page.html',
  styleUrls: ['./publisher-news.page.scss'],
})
export class PublisherNewsPage implements OnInit {

  articleList: Array<any> = [];
  showPageLoader: boolean = false;
  publisherName: string = '';

  constructor(private activatedRoute: ActivatedRoute,private newsApiService: NewsApiService,  private widgetUtilService: WidgetUtilService, private storage: Storage,
    private router: Router, private helperService: HelperService) {
    this.activatedRoute.queryParams.subscribe(result => {
      console.log('query params===',result);
      if (result.code && result.name) {
        this.getPublisherTopHeadline(result.code);
        this.publisherName = result.name;
      }
  });
   }

  ngOnInit() {
  }


  getPublisherTopHeadline(publisherCode) {
    this.showPageLoader = true;
    this.newsApiService.getPublisherTopHeadline(publisherCode).subscribe((result: any) => {
      console.log('result', result);
      this.articleList = result.articles.filter(article => article.urlToImage);
      this.showPageLoader = false;
    }, (error) => {
      console.log('error', error);
      this.showPageLoader = false;
      this.widgetUtilService.presentToast(error.statusText);
    });
  }

  async saveArticle(article) {
    try {
      await this.helperService.saveArticle(article);
      this.widgetUtilService.presentToast('Article Saved Successfully');
    } catch (error) {
      this.widgetUtilService.presentToast(error.message);
    }
  }
 

  async openNewsDetailPage(article) {
    await this.storage.set('currentArticle', article);
    this.router.navigate(['/news-detail']);
  }

}
