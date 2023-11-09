import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private http: HttpClient) { }
  
   /**
   * Get label object representing list of labels by language : {labelKey: labelValue}.
   * @param lang The current translate selected language.
   */
  public getLabels(lang: string) : Observable<Object> {
    return this.http.get("assets/i18n/" + lang + ".json");
  }
}
