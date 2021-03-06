// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {TranslateService} from "@ngx-translate/core";
import {Pipe, PipeTransform} from "@angular/core";
import {Observable, of} from "rxjs";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

export class TranslateServiceStub {

  public get(key: any): any {
    return of(key);
  }

  public use(lang: string): Observable<any> {
    return of(lang);
  }
}

export const TranslateServiceTestingProvider = {provide: TranslateService, useClass: TranslateServiceStub};

@Pipe({name: 'translate'})
export class TranslationMockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}
