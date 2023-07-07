import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserManagementService} from '../_services/user-management.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  content: string;
  userCount: number;
  departementCount: number;
  roleStatistics: any;
  userCountByDepartement: any;
  roleKeys: string[] = [];
  departmentKeys: string[] = [];

  constructor(private userService: UserService, private adminDashboardService: UserManagementService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.loadData();
   // this.roleKeys = Object.keys(this.roleStatistics);
   // this.departmentKeys = Object.keys(this.userCountByDepartement);

  }

  loadData() {
    this.adminDashboardService.getUserCount().subscribe(count => {
      this.userCount = count;
    });

    this.adminDashboardService.getDepartementCount().subscribe(count => {
      this.departementCount = count;
    });

    this.adminDashboardService.getRoleStatistics().subscribe(statistics => {
      this.roleStatistics = statistics;
      this.roleKeys = Object.keys(this.roleStatistics);
    });

    this.adminDashboardService.getUserCountByDepartement().subscribe(counts => {
      this.userCountByDepartement = counts;
      this.departmentKeys = Object.keys(this.userCountByDepartement);
    });
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }


}
