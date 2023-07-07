package tn.esprit.pidev.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import tn.esprit.pidev.entities.ERole;
import tn.esprit.pidev.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findAll();
    User findUserById(Long id);

   // @Modifying
  //  @Query("UPDATE User u SET u.username = :username, u.email = :email WHERE u.id = :id")
   // void updateUserDetails(Long id, String username, String email);

    List<User> findByDepartementIsNull();
    @Query("SELECT u FROM User u WHERE u.departement.id = :departmentId")
    List<User> findByDepartmentId(Long departmentId);

    long countByRoles_Name(ERole role);
}
