import {Link, List} from "./common";
import {Event} from "./event";

export interface Logo {
  id: number;
  thumbnail_hash: string;
  thumbnail: string;
  links: Array<Link>;
}

export interface SponsorRequest {
  id: number;
  event: Event;
  name: string;
  url: string;
  logo: Logo;
  organization?: any;
  sort: number;
  links: Array<Link>;
}

export interface Sponsor extends SponsorRequest {
}

export type SponsorList = List<Sponsor, 'sponsors'>;
