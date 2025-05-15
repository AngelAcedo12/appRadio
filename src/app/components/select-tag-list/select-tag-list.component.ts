import { LocationRadiosService } from './../../services/location-radios.service';
import { Component, EventEmitter, OnInit, Output, Query } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryResult, RadioBrowserApi } from 'radio-browser-api';

@Component({
  selector: 'app-select-tag-list',
  templateUrl: './select-tag-list.component.html',
  styleUrl: './select-tag-list.component.css',
})
export class SelectTagListComponent implements OnInit {
  @Output() refrestListFilter = new EventEmitter<CountryResult[]>();
  ngOnInit(): void {}

  tagSherch = new FormControl('');

  

  tagListShearch: CountryResult[] | undefined;
  tagListShearchSelected: CountryResult[] = [];

  constructor(private locationRadiosService: LocationRadiosService){

  }

  async shearchTag() {
    if (this.tagSherch.value!.length <= 1 || this.tagSherch.value == '') {
      this.tagListShearch = [];
    } else {
      var shearch = await this.locationRadiosService.api.getTags(this.tagSherch.value!, {
        limit: 20,
      });
      this.tagListShearch = shearch;
    }
  }

  selectedTag(item: CountryResult) {
    if (
      this.tagListShearchSelected.length < 3 &&
      !this.tagListShearchSelected.includes(item)
    ) {
      this.tagListShearchSelected?.push(item);
    }

    this.tagSherch.setValue('');
    this.tagListShearch = [];
    this.refrestListFilter.emit(this.tagListShearchSelected);
  }
  removeTag(item: CountryResult) {
    this.tagListShearchSelected = this.tagListShearchSelected.filter(
      (tag) => tag != item
    );
    this.refrestListFilter.emit(this.tagListShearchSelected);
  }
}
