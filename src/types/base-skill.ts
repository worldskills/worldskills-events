import {I18nText} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";
import {AuthEntity} from "./entity";
import {Logo} from "./logo";
import {Photo} from "./photo";

export interface BaseSkillSector {
  id: number;
  name: I18nText;
  description: I18nText;
  links: Array<Link>;
}

export interface BaseSkillTag {
  id: number;
  name: I18nText;
}

export interface BaseSkillSponsor {
  id: number;
  entity: AuthEntity;
  name: I18nText;
  description: I18nText;
  url: string;
  website: string;
  logo: Logo;
  organization?: any;
  links: Array<Link>;
}

export interface BaseSkill {
  id: number;
  name: I18nText;
  summary: I18nText;
  description: I18nText;
  sector: BaseSkillSector;
  url_video: string;
  tags: Array<BaseSkillTag>;
  photos: Array<Photo>;
  sponsors: Array<BaseSkillSponsor>;
  links: Array<Link>;
}

export interface BaseSkillRequest {
  name: I18nText;
  summary: I18nText;
  description: I18nText;
  sector: { id: number };
  url_video: string;
}

export type BaseSkillList = List<BaseSkill, 'base_skills'>;
