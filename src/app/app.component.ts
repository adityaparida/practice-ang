import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practice-ang';
  simpleForm!: FormGroup;
  data!: Observable<Data[]>;
  items!: Data[];

  constructor(
    private addService: AppService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.postForm();
    this.fetchData();
   }

  postForm() {
    this.simpleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  fetchData() {
    this.addService.getData().subscribe(
      res => {
        this.items = res;
      });
  }

  onSubmit() {
    if (!this.simpleForm.valid) {
      return;
    }
    this.addService.addData(this.simpleForm.value).subscribe(
      res => {
        alert('Added');
        this.data = res;
        this.fetchData();
        this.simpleForm.reset();
      });
  }

  updateData(data: any) {
    this.addService.updateData(data.id, data).subscribe(
      res => {
        alert('Updated');
        this.fetchData();
      });
  }

  deleteData(id: number) {
    this.addService.deleteData(id).subscribe(
      res => {
        alert('Deleted');
        this.fetchData();
      });
  }
}
