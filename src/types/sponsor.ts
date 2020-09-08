import {Link, List} from "./common";
import {Event} from "./event";
import {Logo} from "./logo";

export interface SponsorRequest {
  event: { id: number };
  name: string;
  url: string;
  logo?: { id: number };
  organization?: any;
  sort?: number;
}

export interface Sponsor {
  id: number;
  event: Event;
  name: string;
  url: string;
  logo: Logo;
  organization?: any;
  sort: number;
  links: Array<Link>;
}

export type SponsorList = List<Sponsor, 'sponsors'>;
