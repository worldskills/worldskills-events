import {I18nText} from "@worldskills/worldskills-angular-lib";
import {AuthEntity} from "./entity";
import {Link, List} from "./common";
import {Event} from "./event";

export interface SectorRequest {
  name: I18nText;
  event: { id: number };
  base_sector_id: number;
  ws_entity: { id: number }
}

export interface Sector {
  id: number;
  name: I18nText;
  event: Event;
  base_sector_id: number;
  ws_entity: AuthEntity;
  links: Array<Link>;
}

export type SectorList = List<Sector, 'sectors'>;
