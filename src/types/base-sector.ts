import {I18nText} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";

export interface BaseSector {
  id: number;
  name: I18nText;
  description: I18nText;
  links: Array<Link>;
}

export type BaseSectorList = List<BaseSector, 'base_sectors'>;
