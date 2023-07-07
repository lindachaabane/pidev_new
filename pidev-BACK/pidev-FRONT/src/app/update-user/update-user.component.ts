import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../_services/user-management.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: number;
  user: any;
  availableRoles: any[];
  newRoles: { [key: string]: boolean } = {};

    constructor( private route: ActivatedRoute, private usermgt: UserManagementService, private router: Router) { }
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.fetchAvailableRoles();
  }
  getUser(): void {
    this.usermgt.getUserById(this.userId).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  fetchAvailableRoles(): void {
      this.usermgt.getRoles().subscribe(
        (response: any[]) => {
          this.availableRoles = response;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
  updateUser(): void {
    // Création de l'objet user avec les valeurs du formulaire
    const updatedUser = {
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      roles: []
    };

    // Parcours des rôles existants pour ajouter ceux qui sont cochés
    for (const role of this.user.roles) {
      if (role.checked) {
        updatedUser.roles.push({name: role.name});
      }
    }

    // Parcours des nouveaux rôles sélectionnés
    for (const role in this.newRoles) {
      if (this.newRoles.hasOwnProperty(role) && this.newRoles[role]) {
        updatedUser.roles.push({name: role});
      }
    }
    Swal.fire({
      title: 'Are you sure to update this user',
      text: 'If you apply the changes, some user parameters will be changed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes Change it',
      cancelButtonText: 'No Keep it'
    }).then((result) => {
      if ((result.value)){
        this.usermgt.updateUser(updatedUser).subscribe(
          response => {
            console.log('Utilisateur mis à jour avec succès :', response);

          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
          }
        );
        Swal.fire('Done', 'The user parameter has been changed', 'success');
        setTimeout(() => {

          this.router.navigate(['/user_managment']);
          // window.location.href = window.location.href;
        }, 100);


      }else if (result.dismiss === Swal.DismissReason.cancel){
        Swal.fire('Action Cancelled', 'Your user is safe', 'error');
      }

    });



  }

  goBack(): void {
    this.router.navigate(['/user_managment']);
  }
}
