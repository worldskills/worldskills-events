import {Link, List} from "./common";
import {AuthEntity, AuthEntityRequest} from "./entity";
import {I18nText} from "@worldskills/worldskills-angular-lib";
import {Logo} from "./logo";

export interface BaseSponsorRequest {
  entity: AuthEntityRequest;
  name: I18nText;
  description: I18nText;
  url: string;
  website: string;
  logo: Logo;
  organization?: any;
}

export interface BaseSponsor extends BaseSponsorRequest {
  id: number;
  entity: AuthEntity;
  links: Array<Link>;

}

export type BaseSponsorList = List<BaseSponsor, 'base_sponsors'>;

