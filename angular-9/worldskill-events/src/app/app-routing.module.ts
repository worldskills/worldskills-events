import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import {EventsComponent} from "./events/events.component";
import {EventComponent} from "./event/event.component";
import {EventUpdateComponent} from "./event-update/event-update.component";

function forAppCode(appCode: number, roles: Array<string>) {
  return roles.map(name => ({
    appCode,
    name
  }));
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'events',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: EventsComponent,
          },
          {
            path: ':eventId',
            component: EventComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                data: {breadcrumb: 'Event'},
                component: EventUpdateComponent,
              },
            ],
          },
        ],
      }
    ],
  },
  {
    path: 'not-authorized',
    component: ErrorComponent,
    data: {breadcrumb: 'Not authorized', error: 'Not authorized'}
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {breadcrumb: 'Not found', error: 'Not found'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
