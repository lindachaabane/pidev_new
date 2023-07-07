package tn.esprit.pidev.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.pidev.entities.Departement;

import java.util.List;
import java.util.Optional;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
    List<Departement> findAllBy();
    Optional<Departement> findById(Long id);

    Departement getDepartementById(Long id);
}
