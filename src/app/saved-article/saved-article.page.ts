import { Component, OnInit } from '@angular/core';
import { WidgetUtilService } from './../providers/widget-util.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-saved-article',
  templateUrl: './saved-article.page.html',
  styleUrls: ['./saved-article.page.scss'],
})
export class SavedArticlePage implements OnInit {

  articleList: Array<any> = [];
  showPageLoader: boolean = false;


  constructor(private storage: Storage, private router: Router, private widgetUtilService: WidgetUtilService) {
    this.getArticles();
   }

  ngOnInit() {
  }

  async getArticles() {
    this.showPageLoader = true;
    const result = await this.storage.get('savedArticles');
    if (result != null) {
      this.articleList = result;
    }
    this.showPageLoader = false;
  }
  //   if (result != null) {
  //     this.articleList = result;
  //   }
  //   this.showPageLoader = false;
  // }


  async openNewsDetailPage(article) {
    await this.storage.set('currentArticle', article);
    this.router.navigate(['/news-detail']);
  }

  removeArticle(url){
    this.widgetUtilService.presentAlertConfirm('Confirm','Are you sure you want to delete this article ?',  [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Okay',
        handler:async () => {
         await this.storage.set('savedArticles',this.articleList.filter(article => article.url !=url));
          this.getArticles();
          this.widgetUtilService.presentToast('Article removed sccessfully');
        }
      }
    ])
  }


  doRefresh(event) {
    this.getArticles();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
