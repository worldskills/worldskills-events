import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import {EventsComponent} from "./events/events.component";
import {EventComponent} from "./event/event.component";
import {EventUpdateComponent} from "./event-update/event-update.component";
import {SkillsComponent} from "./skills/skills.component";
import {SkillComponent} from "./skill/skill.component";
import {SkillUpdateComponent} from "./skill-update/skill-update.component";
import {SkillPhotosComponent} from "./skill-photos/skill-photos.component";
import {SkillTagsComponent} from "./skill-tags/skill-tags.component";
import {SkillSponsorsComponent} from "./skill-sponsors/skill-sponsors.component";
import {SkillCopyComponent} from "./skill-copy/skill-copy.component";
import {SectorsComponent} from "./sectors/sectors.component";
import {SectorUpdateComponent} from "./sector-update/sector-update.component";
import {SectorCreateComponent} from "./sector-create/sector-create.component";

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
              {
                path: 'skills',
                data: {breadcrumb: 'Skills'},
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: SkillsComponent,
                  },
                  {
                    path: ':skillId',
                    data: {breadcrumb: 'Skill'},
                    component: SkillComponent,
                    children: [
                      {
                        path: '',
                        pathMatch: 'full',
                        data: {breadcrumb: 'Update Skill'},
                        component: SkillUpdateComponent,
                      },
                      {
                        path: 'photos',
                        data: {breadcrumb: 'Photos'},
                        children: [
                          {
                            path: '',
                            pathMatch: 'full',
                            component: SkillPhotosComponent,
                          },
                        ],
                      },
                      {
                        path: 'tags',
                        data: {breadcrumb: 'Tags'},
                        component: SkillTagsComponent,
                      },
                      {
                        path: 'sponsors',
                        data: {breadcrumb: 'Sponsors'},
                        component: SkillSponsorsComponent,
                      },
                      {
                        path: 'copy',
                        data: {breadcrumb: 'Copy'},
                        component: SkillCopyComponent,
                      },
                    ],
                  },
                ],
              },
              {
                path: 'sectors',
                data: {breadcrumb: 'Sectors'},
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: SectorsComponent,
                  },
                  {
                    path: 'create',
                    data: {breadcrumb: 'Create Sector'},
                    component: SectorCreateComponent,
                  },
                  {
                    path: ':sectorId',
                    data: {breadcrumb: 'Update Sector'},
                    component: SectorUpdateComponent,
                  }
                ],
              }
            ],
          },
        ],
      },
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
