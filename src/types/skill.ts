import {Link, List} from "./common";
import {I18nText} from "@worldskills/worldskills-angular-lib";
import {AuthEntity} from "./entity";
import {Sector} from "./sector";
import {Photo} from "./photo";
import {Tag} from "./tag";
import {Event} from "./event";
import {Sponsor} from "./sponsor";

export interface EventSkillRequest {
  id: number;
}

export interface EventSkillCloneRequest {
  event: {
    id: number
  };
}

export interface SkillRequest {
  event: { id: number };
  type: string;
  base_id: number;
  number: string;
  status: string;
  url_video: string;
  sort: number;
  name: I18nText;
  summary: I18nText;
  description: I18nText;
  description_required_skills: I18nText;
  description_industry_action: I18nText;
  description_competition_action: I18nText;
  description_facts: I18nText;
  group?: any;
  sector: { id: number };
  min_teams: number;
  max_teams?: any;
  team_size: number;
  identify_judges: boolean;
  group_competitors: boolean;
  compatriot_marking: boolean;
  generate_500_scale: boolean;
  landscape_marking: boolean;
  competitor_max_age: number;
  ws_entity?: { id: number };
}

export interface Skill {
  id: number;
  event: Event;
  type: string;
  base_id: number;
  number: string;
  status: string;
  url_video: string;
  sort: number;
  name: I18nText;
  summary: I18nText;
  description: I18nText;
  description_required_skills: I18nText;
  description_industry_action: I18nText;
  description_competition_action: I18nText;
  description_facts: I18nText;
  group?: any;
  sector: Sector;
  min_teams: number;
  max_teams?: any;
  team_size: number;
  identify_judges: boolean;
  group_competitors: boolean;
  compatriot_marking: boolean;
  generate_500_scale: boolean;
  landscape_marking: boolean;
  competitor_max_age: number;
  photos: Array<Photo>;
  tags: Array<Tag>;
  sponsors: Array<Sponsor>;
  ws_entity: AuthEntity;
  links: Array<Link>;
}

export type SkillList = List<Skill, 'skills'>;
