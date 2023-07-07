package tn.esprit.pidev.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.pidev.entities.ERole;
import tn.esprit.pidev.entities.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
    @Query("SELECT r FROM Role r WHERE r.name = :roleName")
    Role find(@Param("roleName") ERole roleName);

    List<Role> findAll();
}
