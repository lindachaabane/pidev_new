import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../_services/user-management.service';
import {UserService} from '../_services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manage-departement',
  templateUrl: './manage-departement.component.html',
  styleUrls: ['./manage-departement.component.css']
})
export class ManageDepartementComponent implements OnInit {
  data: any[] = [];

  departmentName: string;
  content: string;

  constructor( private usermgt: UserManagementService, private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.fetchData();
  }

  fetchData(): void{
    this.usermgt.getDepts().subscribe(
      (response: any[]) => {
        this.data = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createDepartment(): void {
    if (this.departmentName) {
      // console.log(this.departmentName);
      this.usermgt.createDepartment(this.departmentName).subscribe(
        createdDepartment => {
          console.log('Department created:', createdDepartment);
          this.fetchData(); // Rafraîchir la liste des départements
          this.departmentName = ''; // Réinitialiser le champ de texte
        },
        error => {
          console.error('Error creating department:', error);
          // Gérer les erreurs de création de département
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  navigateToAffectUser(){
    this.router.navigate(['/affectusertodep']);
  }

  /*getDep(id: number){
    this.router.navigate(['/userbydep', id]);
}*/
  getDep(id: number, depName: string) {
    this.usermgt.setDepartmentName(depName);

    this.router.navigate(['/userbydep', id]);
  }

  deleteDepartment(departmentId: number, userCount: number) {
    if (userCount === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Confirm deletion',
        text: 'There are no employees in this department at the moment. Are you sure you want to delete it? You won\'t be able to get it back!',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usermgt.deleteDepartment(departmentId).subscribe(
            () => {
              setTimeout(() => {
                console.log('Fetching data...');
                this.fetchData();
              }, 100);
            },
            (error) => {
              // Handle error
              console.error('An error occurred while deleting the department:', error);
            }
          );
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cannot delete the department',
        text: 'It has associated users.'
      });
    }
      // console.log('Cannot delete the department. Users exist in the department.');
    }

  goBack(): void {
    this.router.navigate(['/admin']);
  }

}
