import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {UserManagementService} from '../_services/user-management.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  content: string;
  data: any[];
  currentUserId: number;
  user: any;

  searchFilter: string = ''; // Terme de recherche


  // ...

  constructor(private userService: UserService, private usermgt: UserManagementService, private router: Router) {
    this.currentUserId = JSON.parse(window.sessionStorage.getItem('auth-user')).id;
  }
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
    console.log(this.data);
  }

  fetchData(): void {

    this.usermgt.getData().subscribe(
      (response: any[]) => {
        this.data = response;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: 'Are you sure to delete this user ?',
      text: 'You will not be able to recover it',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Delete it',
      cancelButtonText: 'No Keep it'
    }).then((result) => {
      if ((result.value)){
        this.usermgt.deleteUser(id).subscribe(
          () => {
            this.fetchData(); // Refresh the user list after deletion
            setTimeout(() => {
              console.log('Fetching data...');
              this.fetchData();
              // window.location.href = window.location.href;
            }, 1000);
          },
          error => {
            console.error('Error deleting user:', error);
          }
        );
        Swal.fire('Deleted', 'The user has been deleted', 'success');
      }else if (result.dismiss === Swal.DismissReason.cancel){
        Swal.fire('Action Cancelled', 'Your user is safe', 'error');
      }

    });
  }
  getUserId(id: number): void {
    this.router.navigate(['/updateuser', id]);
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
