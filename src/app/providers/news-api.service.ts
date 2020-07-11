import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  baseUrl: string = environment.baseUrl;
  apikey: string = environment.apikey;


  constructor(private http: HttpClient) { }

 getTopHeadlines(countryCode: string,categoryId: string){

  let url = `${this.baseUrl}/top-headlines?apikey=${this.apikey}&country=${countryCode}`;
  if(categoryId !='all'){
    url = `${url}&category=${categoryId}`
  }
  return this.http.get(url);
 }


 getPublisherTopHeadline(publisherCode: string) {
  return this.http.get(`${this.baseUrl}/top-headlines?apiKey=${this.apikey}&sources=${publisherCode}`);
}



}
