import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { emptyPerson } from '../empty-person';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
})
export class ReactiveFormsComponent implements OnInit {
  constructor(private ps: PersonService) {}

  person: Person = emptyPerson;
  wealthOpts = ['poor', 'rich', 'middle_class'];

  personForm: UntypedFormGroup;

  ngOnInit() {
    this.personForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.person.name, Validators.required),
      age: new UntypedFormControl(this.person.age),
      email: new UntypedFormControl(this.person.email),
      gender: new UntypedFormControl(this.person.gender),
      wealth: new UntypedFormControl(this.person.wealth),
    });

    this.ps.getPerson().subscribe((p) => {
      // Could be setValue if model is implemented with all props in form
      // Oherwise use patchValue
      this.personForm.patchValue(p);
    });
  }

  savePerson(personForm): void {
    this.ps.save(personForm);
  }
}
