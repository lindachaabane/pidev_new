import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserManagementService} from '../_services/user-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-by-dep',
  templateUrl: './user-by-dep.component.html',
  styleUrls: ['./user-by-dep.component.css']
})
export class UserByDepComponent implements OnInit {
  departmentId: number;
   departmentName: string;
  users: any[];
  constructor(private usermgt: UserManagementService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.departmentName = this.usermgt.getDepartmentName();
    console.log('*/*/*/' + this.departmentName);
    this.departmentId = +this.route.snapshot.paramMap.get('id');

    this.getUsersByDepartment();


  }

  getUsersByDepartment(): void {
    this.usermgt.getUsersByDepartment(this.departmentId)
      .subscribe(
        users => {
          this.users = users;
          console.log(this.users);
        },
        error => {
          console.log('Error:', error);
        }
      );
  }


  removeDepartmentFromUser(userId: number): void {
    Swal.fire({
      icon: 'warning',
      title: '!Remove a department!',
      text: 'You are trying to remove this user from his department. Are you sure you want to continue?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usermgt.removeDepartmentFromUser(userId).subscribe(() => {
          this.getUsersByDepartment();
        });
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/departments-management']);
  }


}
