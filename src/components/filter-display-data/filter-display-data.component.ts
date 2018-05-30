import { EarthquakeFilterService } from './../../services/earthquake-filter.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'filter-display-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-input-container">
      <input class="filter-input" type="text" [(ngModel)]="text" (keyup)=updateText() placeholder="Filter Results">
    </div>
  `,
  styleUrls: ['./filter-display-data.component.css']
})
export class FilterDisplayDataComponent implements OnInit {
  text: string;

  constructor(private earthquakeFilterService: EarthquakeFilterService) { }

  ngOnInit(): void {
  }

  updateText(): void {
    this.earthquakeFilterService.notifyFilterTextChanges(this.text);
  }
}
