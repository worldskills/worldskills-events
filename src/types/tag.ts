import {I18nText} from "@worldskills/worldskills-angular-lib";
import {List} from "./common";

export interface TagRequest {
  name: I18nText;
}

export interface Tag {
  id: number;
  name: I18nText;
}

export type TagList = List<Tag, 'tags'>;
