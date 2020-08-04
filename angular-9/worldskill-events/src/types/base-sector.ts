import {I18nModel} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";

export interface BaseSector {
  id: number;
  name: I18nModel;
  description: I18nModel;
  links: Array<Link>;
}

export type BaseSectorList = List<BaseSector, 'base_sectors'>;
