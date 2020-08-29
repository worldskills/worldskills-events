import {I18nText} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";
import {AuthEntity} from "./entity";

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

export interface BaseSkillPhoto {
  id: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  description: I18nText;
  sort: number;
  links: Array<Link>;
}

export interface Logo {
  id: number;
  thumbnail_hash: string;
  thumbnail: string;
  links: Array<Link>;
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
  photos: Array<BaseSkillPhoto>;
  sponsors: Array<BaseSkillSponsor>;
  links: Array<Link>;
}

export type BaseSkillList = List<BaseSkill, 'base_skills'>;
