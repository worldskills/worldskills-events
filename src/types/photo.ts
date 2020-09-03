import {I18nText} from "@worldskills/worldskills-angular-lib";
import {Link} from "./common";

export interface Photo {
  id?: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  description: I18nText;
  sort: number;
  links: Array<Link>;
}
