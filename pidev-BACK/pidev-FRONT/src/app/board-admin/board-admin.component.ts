import {Component, OnInit} from '@angular/core';
import { UserService } from '../_services/user.service';
import {UserManagementService} from '../_services/user-management.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content: string;
  constructor(private userService: UserService, private usermgt: UserManagementService, private router: Router) {}
  ngOnInit(): void {
      this.userService.getAdminBoard().subscribe(
          data => {
            this.content = data;
          },
          err => {
            this.content = JSON.parse(err.error).message;
          }
        );
  }
  // tslint:disable-next-line:typedef
   navigateToUserManagement() {
    this.router.navigate(['/user_managment']);
  }
  // tslint:disable-next-line:typedef
  navigateToDepartmentsManagement() {
    this.router.navigate(['/departments-management']);
  }
  navigateToAdminDashboard(){
    this.router.navigate(['/admindashboard']);
  }
}
