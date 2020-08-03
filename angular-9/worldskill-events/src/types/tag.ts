import {I18nModel} from "@worldskills/worldskills-angular-lib";
import {List} from "./common";

export interface Tag {
  id: number;
  name: I18nModel;
}

export type TagList = List<Tag, 'tags'>;
