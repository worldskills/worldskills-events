import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ErrorComponent} from "./error/error.component";
import {EventsComponent} from "./events/events.component";
import {EventComponent} from "./event/event.component";
import {EventUpdateComponent} from "./event-update/event-update.component";
import {SkillsComponent} from "./skills/skills.component";
import {SkillsTranslationsComponent} from './skills-translations/skills-translations.component';
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
import {BaseSkillsComponent} from "./base-skills/base-skills.component";
import {BaseSponsorsComponent} from "./base-sponsors/base-sponsors.component";
import {BaseSkillComponent} from "./base-skill/base-skill.component";
import {BaseSkillUpdateComponent} from "./base-skill-update/base-skill-update.component";
import {BaseSkillPhotosComponent} from "./base-skill-photos/base-skill-photos.component";
import {BaseSkillPhotoCreateComponent} from "./base-skill-photo-create/base-skill-photo-create.component";
import {BaseSkillPhotoUpdateComponent} from "./base-skill-photo-update/base-skill-photo-update.component";
import {BaseSkillTagsComponent} from "./base-skill-tags/base-skill-tags.component";
import {BaseSkillSponsorsComponent} from "./base-skill-sponsors/base-skill-sponsors.component";
import {BaseSponsorCreateComponent} from "./base-sponsor-create/base-sponsor-create.component";
import {BaseSponsorUpdateComponent} from "./base-sponsor-update/base-sponsor-update.component";

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
        path: 'base-skills',
        data: {breadcrumb: 'Base Skills'},
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BaseSkillsComponent,
          },
          {
            path: ':baseSkillId',
            component: BaseSkillComponent,
            data: {breadcrumb: 'Base Skill'},
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: BaseSkillUpdateComponent,
              },
              {
                path: 'photos',
                data: {breadcrumb: 'Base Skill Photos'},
                children: [
                  {
                    path: '',
                    pathMatch: 'full',
                    component: BaseSkillPhotosComponent,
                  },
                  {
                    path: 'create',
                    data: {breadcrumb: 'Create Base Skill Photo'},
                    component: BaseSkillPhotoCreateComponent,
                  },
                  {
                    path: ':baseSkillPhotoId',
                    data: {breadcrumb: 'Change Base Skill Photo'},
                    component: BaseSkillPhotoUpdateComponent,
                  },
                ],
              },
              {
                path: 'tags',
                data: {breadcrumb: 'Base Skill Tags'},
                component: BaseSkillTagsComponent,
              },
              {
                path: 'sponsors',
                data: {breadcrumb: 'Base Skill Sponsors'},
                component: BaseSkillSponsorsComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'base-sponsors',
        data: {breadcrumb: 'Base Sponsors'},
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: BaseSponsorsComponent,
          },
          {
            path: 'create',
            data: {breadcrumb: 'Create Base Sponsor'},
            component: BaseSponsorCreateComponent,
          },
          {
            path: ':baseSponsorId',
            data: {breadcrumb: 'Change Base Sponsor'},
            component: BaseSponsorUpdateComponent,
          }
        ],
      },
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
                data: {breadcrumb: 'Change Event'},
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
                    path: 'translations',
                    component: SkillsTranslationsComponent,
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
                        data: {breadcrumb: 'Change Skill'},
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
                            data: {breadcrumb: 'Change Skill Photo'},
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
                    data: {breadcrumb: 'Change Sector'},
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
                    data: {breadcrumb: 'Change Tag'},
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
                    data: {breadcrumb: 'Change Sponsor'},
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
