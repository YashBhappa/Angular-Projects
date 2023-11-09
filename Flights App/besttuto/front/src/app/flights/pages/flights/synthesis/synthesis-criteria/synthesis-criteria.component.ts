import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SynthesisCriteria } from 'src/app/shared/models/synthesis-criteria.model';

@Component({
  selector: 'app-synthesis-criteria',
  templateUrl: './synthesis-criteria.component.html',
  styleUrls: ['./synthesis-criteria.component.css'],
  
})
export class SynthesisCriteriaComponent implements OnInit {
  synthesisForm: FormGroup;
  @Output() onSearch = new EventEmitter<SynthesisCriteria>();

  constructor(private readonly sharedService: SharedService) { }

  ngOnInit(): void {
    if (this.sharedService.syntheseCreationDone === false) {
      this.sharedService.createSynthesisCriteriaForm();
      this.sharedService.syntheseCreationDone = true;
    }
    this.synthesisForm = this.sharedService.synthesisForm;
  }

  doSynthesis() {
    const synthesisCriteriaValues = this.synthesisForm.value;
    this.onSearch.emit(synthesisCriteriaValues);
  }
}
