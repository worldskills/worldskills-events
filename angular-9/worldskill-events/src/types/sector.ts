import {I18nModel} from "@worldskills/worldskills-angular-lib";
import {AuthEntity} from "./entity";
import {Link, List} from "./common";
import {Event} from "./skill";

export interface Sector {
  id: number;
  name: I18nModel;
  event: Event;
  base_sector_id: number;
  ws_entity: AuthEntity;
  links: Array<Link>;
}

export type SectorList = List<Sector, 'sectors'>;
