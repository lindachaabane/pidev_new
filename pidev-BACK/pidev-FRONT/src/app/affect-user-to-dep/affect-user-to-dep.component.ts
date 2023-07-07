import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../_services/user-management.service';
import {UserService} from '../_services/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-affect-user-to-dep',
  templateUrl: './affect-user-to-dep.component.html',
  styleUrls: ['./affect-user-to-dep.component.css']
})
export class AffectUserToDepComponent implements OnInit {
  usersWithoutDepartment: any[];
  data: any[];
  selectedDepartmentIds: { [key: string]: any } = {};
  content: string;
  constructor(private userService: UserService, private usermgt: UserManagementService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );


    this.getUsersWithoutDepartment();
    this.fetchData();
  }

  // tslint:disable-next-line:typedef
  getUsersWithoutDepartment() {
    this.usermgt.getUsersWithoutDepartment().subscribe(users => {
      this.usersWithoutDepartment = users;
      for (const user of this.usersWithoutDepartment) {
        this.selectedDepartmentIds[user.id] = '';
      }
    });
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

  assignUserToDepartment(userId: number, departmentId: number) {
    this.usermgt.assignUserToDepartment(userId, departmentId)
      .subscribe(
        () => {
          setTimeout(() => {
            console.log('Fetching data...');
            this.getUsersWithoutDepartment();
            // window.location.href = window.location.href;
          }, 100);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User affected to the department successfully'
          });
        },
        (error) => {
          console.error('Error assigning user to department:', error);
          // Vous pouvez ajouter ici une logique de gestion des erreurs
        }
      );
  }


  initializeSelectedDepartmentIds(): void {
    this.usersWithoutDepartment.forEach(user => {
      this.selectedDepartmentIds[user.id] = null;
    });
  }

  goBack(): void {
    this.router.navigate(['/departments-management']);
  }

}
