import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Event} from '../../types/event';
import {Sector, SectorRequest} from '../../types/sector';
import {NgForm} from '@angular/forms';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {BaseSector} from "../../types/base-sector";
import {BaseSectorsService} from "../../services/base-sectors/base-sectors.service";

@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrls: ['./sector-form.component.css']
})
export class SectorFormComponent extends WsComponent implements OnInit {

  @Input() event: Event;
  @Input() sector: Sector = null;
  @Input() editable = false;
  baseSectors: Array<BaseSector>;
  @Output() save: EventEmitter<SectorRequest> = new EventEmitter<SectorRequest>();
  @ViewChild('form') form: NgForm;
  loading = false;

  constructor(
    private baseSectorsService: BaseSectorsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.baseSectorsService.subject.subscribe(baseSectors => (this.baseSectors = baseSectors.base_sectors)),
      this.baseSectorsService.loading.subscribe(loading => (this.loading = loading)),
    );
    this.baseSectorsService.fetch();
  }

  get initialized() {
    return !!this.baseSectors;
  }

  submit() {
    if (this.editable && this.form.valid) {
      const {
        name,
        base_sector_id,
      } = this.form.value;
      const sector: SectorRequest = {
        name: {
          text: name,
          lang_code: 'en',
        },
        base_sector_id: base_sector_id ? parseInt(base_sector_id) : undefined,
        event: {id: this.event.id},
        ws_entity: this.sector ? {id: this.sector.ws_entity.id} : undefined,
      };
      this.save.emit(sector);
    }
  }

}
