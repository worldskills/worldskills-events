import {Link, List} from './common';
import {AuthEntity} from './entity';
import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface EventRequest {
  name: string;
  type: string;
  start_date: string;
  end_date: string;
  closing_date: string;
  closed?: boolean;
  venue: string;
  town: string;
  code: string;
  country: {
    id: number;
  };
  utc_offset: number;
  url: string;
  cancelled: boolean;
  description: string;
  ws_entity: {
    id: number;
  };
}

export interface Event extends EventRequest {
  id: number;
  country: {
    id: number;
    code: string;
    name: I18nText;
  };
  ws_entity: AuthEntity;
  links: Array<Link>;
}

export type EventList = List<Event, 'events'>;
