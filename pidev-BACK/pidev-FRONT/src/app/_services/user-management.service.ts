import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';


const API_URL = 'http://localhost:8081/';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private departmentName: string;

  constructor(private http: HttpClient) { }

  public getData(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'users');
  }

  deleteUser(id: number): Observable<any> {

    return this.http.delete(API_URL + 'delete/' + id);
  }

  getUserById(id: number): Observable<any> {

    return this.http.get<any[]>(API_URL + 'getuser/' + id);
  }
   public getRoles(): Observable<any[]>{
    return this.http.get<any[]>(API_URL + 'roles');
  }
  public updateUser(user: any): Observable<any>{
    return  this.http.put(API_URL + 'update/' + user.id , user);
  }

  public getDepts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'all_dep');
  }

  createDepartment(name: string): Observable<any> {
    const body = { name };
    return this.http.post<any>(API_URL + 'add_dep?name=' + name, null);
  }

  getUsersWithoutDepartment(): Observable<any>  {
    return this.http.get<any[]>(API_URL + 'users_no_dep');
  }

  // tslint:disable-next-line:typedef
  assignUserToDepartment(userId: number, departmentId: number) {
    const url = API_URL + 'affect?user_id=' + userId + '&dep_id=' + departmentId;
    return this.http.post(url, null); // Effectue une requête POST vers l'URL avec un corps vide
  }


  getUsersByDepartment(departmentId: number): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8081/department/' + departmentId)
      .pipe(
        catchError(this.handleError)
      );
  }

  setDepartmentName(name: string): void {
    this.departmentName = name;
  }

  getDepartmentName(): string {
    return this.departmentName;
  }


  removeDepartmentFromUser(userId: number): Observable<any> {
    return this.http.put(API_URL + userId + '/remove-department', {});
  }

  /*deleteDepartment(id: number) {
    return this.http.delete(API_URL + 'delete_dep/' + id);
  }*/
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(API_URL + 'delete_dep/' + id, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }




  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(`Code d'erreur : ${error.status}, ` +
        `Erreur : ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur générique
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  /* Dashboardinng */
  getUserCount() {
    return this.http.get<number>(API_URL + 'user-count');
  }

  getDepartementCount() {
    return this.http.get<number>(API_URL + 'departement-count');
  }

  getRoleStatistics() {
    return this.http.get<any>(API_URL + 'role-statistics');
  }

  getUserCountByDepartement() {
    return this.http.get<any>(API_URL + 'user-count-by-departement');
  }
}

