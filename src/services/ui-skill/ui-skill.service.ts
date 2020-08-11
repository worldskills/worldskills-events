import {Injectable, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiSkillService {

  subject: Subject<TemplateRef<any>> = new Subject<TemplateRef<any>>();

}
