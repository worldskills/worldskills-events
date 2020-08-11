import {I18nModel} from "@worldskills/worldskills-angular-lib";
import {Link, List} from "./common";
import {AuthEntity} from "./entity";

export interface BaseSkillSector {
  id: number;
  name: I18nModel;
  description: I18nModel;
  links: Array<Link>;
}

export interface BaseSkillTag {
  id: number;
  name: I18nModel;
}

export interface BaseSkillPhoto {
  id: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  description: I18nModel;
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
  name: I18nModel;
  description: I18nModel;
  url: string;
  website: string;
  logo: Logo;
  organization?: any;
  links: Array<Link>;
}

export interface BaseSkill {
  id: number;
  name: I18nModel;
  summary: I18nModel;
  description: I18nModel;
  sector: BaseSkillSector;
  url_video: string;
  tags: Array<BaseSkillTag>;
  photos: Array<BaseSkillPhoto>;
  sponsors: Array<BaseSkillSponsor>;
  links: Array<Link>;
}

export type BaseSkillList = List<BaseSkill, 'base_skills'>;
