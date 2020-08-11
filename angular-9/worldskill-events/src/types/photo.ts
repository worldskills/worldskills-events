import {I18nModel} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";

export interface PhotoRequest {
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  description: I18nModel;
  sort: number;
  links: Array<Link>;
}

export interface Photo extends PhotoRequest {
  id: number;
}
