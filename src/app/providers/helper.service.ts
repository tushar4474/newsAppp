import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private storage:Storage) { }



  async saveArticle(article) {
    try{

      const result = await this.storage.get('savedArticles');
      if (result != null){
        const exstingArticleList = result.filter(item => item.url === article.url);
        if(exstingArticleList.length){
          throw new Error ('oops Article already saved...');
        }
     result.push(article);
     await this.storage.set('savedArticles', result);
 
   }else{
     await this.storage.set('savedArticles', [article]);
   }

 
    }catch(error){
     throw new Error(error);
    }
    
  }

}
