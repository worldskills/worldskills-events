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
import {SectorListComponent} from "./sector-list/sector-list.component";
import {SectorUpdateComponent} from "./sector-update/sector-update.component";
import {SectorCreateComponent} from "./sector-create/sector-create.component";
import {TagsComponent} from "./tags/tags.component";
import {TagCreateComponent} from "./tag-create/tag-create.component";
import {TagUpdateComponent} from "./tag-update/tag-update.component";
import {SponsorsComponent} from './sponsors/sponsors.component';
import {SponsorCreateComponent} from "./sponsor-create/sponsor-create.component";
import {SponsorUpdateComponent} from "./sponsor-update/sponsor-update.component";
import {EventCreateComponent} from "./event-create/event-create.component";
import {SkillCreateComponent} from "./skill-create/skill-create.component";
import {SkillPhotoCreateComponent} from "./skill-photo-create/skill-photo-create.component";
import {SkillPhotoUpdateComponent} from "./skill-photo-update/skill-photo-update.component";
import {SectorsComponent} from "./sectors/sectors.component";

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
            path: 'add',
            data: {breadcrumb: 'Add Event'},
            component: EventCreateComponent,
          },
          {
            path: ':eventId',
            component: EventComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                data: {breadcrumb: 'Update Event'},
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
                    path: 'create',
                    data: {breadcrumb: 'Create Skill'},
                    component: SkillCreateComponent,
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
                          {
                            path: 'create',
                            data: {breadcrumb: 'Create Skill Photo'},
                            component: SkillPhotoCreateComponent,
                          },
                          {
                            path: ':skillPhotoId',
                            data: {breadcrumb: 'Update Skill Photo'},
                            component: SkillPhotoUpdateComponent,
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
                component: SectorsComponent,
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: SectorListComponent,
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
              },
              {
                path: 'tags',
                data: {breadcrumb: 'Tags'},
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: TagsComponent,
                  },
                  {
                    path: 'create',
                    data: {breadcrumb: 'Create Tag'},
                    component: TagCreateComponent,
                  },
                  {
                    path: ':tagId',
                    data: {breadcrumb: 'Update Tag'},
                    component: TagUpdateComponent,
                  }
                ],
              },
              {
                path: 'sponsors',
                data: {breadcrumb: 'Sponsors'},
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: SponsorsComponent,
                  },
                  {
                    path: 'create',
                    data: {breadcrumb: 'Create Sponsor'},
                    component: SponsorCreateComponent,
                  },
                  {
                    path: ':sponsorId',
                    data: {breadcrumb: 'Update Sponsor'},
                    component: SponsorUpdateComponent,
                  }
                ],
              },
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
