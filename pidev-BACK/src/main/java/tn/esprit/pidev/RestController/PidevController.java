package tn.esprit.pidev.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.pidev.entities.Departement;
import tn.esprit.pidev.entities.Role;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.security.services.UserDetailsServiceImpl;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PidevController {

    @Autowired
    UserDetailsServiceImpl userService;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getuser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserbyId(@PathVariable Long id){
        return userService.getUserbyId(id);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        String result = userService.deleteUser(id);
        if (result.equals("User deleted successfully")) {
            return ResponseEntity.ok().build(); // Utilisateur supprimé avec succès (statut 200)
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Erreur lors de la suppression de l'utilisateur (statut 500)
        }
    }

    @GetMapping("/roles")
    @PreAuthorize("hasRole('ADMIN')")
    List<Role> getAvailableRoles(){
        return userService.getRoles();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {

        User updatedUser = userService.updateUser(id, user);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    /** GESTION DES DEPARTEMENTS **/

    @PostMapping("/add_dep")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Departement  > createDepartement(@RequestParam("name") String name) {
        Departement createdDepartement = userService.createDepartement(name);
        return ResponseEntity.ok(createdDepartement);
    }

    @GetMapping("/all_dep")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Departement>> getAllDepartments() {
        List<Departement> departments = userService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/users_no_dep")
    @PreAuthorize("hasRole('ADMIN')")
    List<User> getUsersWithoutDepartment(){
        return userService.getUsersWithoutDepartment();
    }

   /* @PostMapping("/affect/{userId}/assign-department/{departmentId}")
    public ResponseEntity<String> assignUserToDepartment(@PathVariable("userId") Long userId, @PathVariable("departmentId") Long departmentId) {
        userService.assignUserToDepartment(userId, departmentId);
        return ResponseEntity.ok("Utilisateur affecté au département avec succès.");
    }*/

    @PostMapping("/affect")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignUserToDepartment(@RequestParam("user_id")Long userId , @RequestParam("dep_id") Long departmentId) {
        System.out.println(userId);
        System.out.println("******************");
        System.out.println(departmentId);
        userService.assignUserToDepartment(userId, departmentId);

        return ResponseEntity.ok().build(); // Renvoie une réponse avec le statut 200 (OK)
    }

    @GetMapping("/department/{departmentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getUsersByDepartment(@PathVariable Long departmentId) {
        List<User> users = userService.getUsersByDepartment(departmentId);
        for(User u : users){
            System.out.println(u.getUsername());
        }
        return ResponseEntity.ok(users);
    }
    /*@GetMapping("/getdepname/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String getDepName(@PathVariable Long id){
        return userService.getDepName(id);
    }*/

    @PutMapping("/{userId}/remove-department")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removeDepartmentFromUser(@PathVariable Long userId, @RequestBody(required = false) Map<String, Object> requestBody) {
        userService.removeDepartmentFromUser(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete_dep/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteDepartement(@PathVariable("id") Long departementId) {
        try {
            userService.deleteDepartement(departementId);
            return ResponseEntity.ok().body("Departement deleted successfully.");
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Departement not found", e);
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }


    /** Dashboarding **/

    @GetMapping("/user-count")
    @PreAuthorize("hasRole('ADMIN')")
    public long getUserCount() {
        return userService.getUserCount();
    }

    @GetMapping("/departement-count")
    @PreAuthorize("hasRole('ADMIN')")
    public long getDepartementCount() {
        return userService.getDepartementCount();
    }

    @GetMapping("/role-statistics")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Double> getRoleStatistics() {
        return userService.getRoleStatistics();
    }

    @GetMapping("/user-count-by-departement")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Long> getUserCountByDepartement() {
        return userService.getUserCountByDepartement();
    }


}
