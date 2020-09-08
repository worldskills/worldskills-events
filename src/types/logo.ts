import {Link} from "./common";

export interface Logo {
  id: number;
  thumbnail_hash: string;
  thumbnail: string;
  links: Array<Link>;
}
