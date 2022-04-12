import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  employees = new FormArray([]);
  cost: number = 0;
  yearlySalary: number = 2000 * 26;

  constructor(
    private fb: FormBuilder
  ) {
  }
  
  ngOnInit(): void {
    this.calculateCost();
  }
  
  getDeps(employeeIndex: number) {
    return this.employees.controls[employeeIndex].get('dependents') as FormArray;
  }


  addEmployee(): void {
    const employeeForm = this.fb.group({
      firstName: null,
      lastName: null,
      dependents: this.fb.array([])
    })
    this.employees.push(employeeForm);
  }

  removeEmployee(index: number): void {
    this.employees.removeAt(index);
  }

  removeDependent(employeeIndex: number, dependentIndex: number) {
    const dependents = this.employees.controls[employeeIndex].get('dependents') as FormArray;
    dependents.removeAt(dependentIndex);
  }

  addDep() {
    return this.fb.group({
      firstName: null,
      lastName: null,
    })
  }

  calculateBenefits() {
    let sum = 0;
    if(this.employees.value > 0) {
      sum
    }
  }

  checkFirstName(name: string) {
    if(name) {
      return name.charAt(0) === 'A' 
    }
    return false
  }

  calculateCost() {
    this.employees.valueChanges.pipe(
      map(employees => {
        let sum = 0;
        employees.forEach(employee => {
          sum += this.calculateEmployeeCost(employee.firstName);
          sum += this.calculateEmployeeCost(employee.lastName);
          employee.dependents.forEach(dependent => {
            sum += this.calculateDependentCost(dependent.firstName);
            sum += this.calculateDependentCost(dependent.lastName);
          })
        })
        return sum;
      })
    ).subscribe(c => {
      this.cost = c;
      this.yearlySalary = this.yearlySalary - c;
      console.log(this.yearlySalary);
    })
  }
  

  calculateEmployeeCost(employeeName: string) {
    const employeeBase = 1000;
    if(this.checkFirstName(employeeName)) {
      return employeeBase * 0.9;
    }
    return employeeBase;
  }

  calculateDependentCost(dependentName: string) {
    const depBase = 500;
    if(this.checkFirstName(dependentName)) {
      return depBase * 0.9;
    }
    return depBase;
  }

  addDependent(employeeIndex: number) {
    const dependents = this.employees.controls[employeeIndex].get('dependents') as FormArray;
    dependents.push(this.addDep());
  }
}
