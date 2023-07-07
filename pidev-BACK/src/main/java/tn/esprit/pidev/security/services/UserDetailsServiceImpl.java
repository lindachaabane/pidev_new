package tn.esprit.pidev.security.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.pidev.entities.Departement;
import tn.esprit.pidev.entities.ERole;
import tn.esprit.pidev.entities.Role;
import tn.esprit.pidev.entities.User;
import tn.esprit.pidev.repositories.DepartementRepository;
import tn.esprit.pidev.repositories.RoleRepository;
import tn.esprit.pidev.repositories.UserRepository;


import java.util.*;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepo;
    @Autowired
    DepartementRepository departementRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(user);
    }

    @Transactional
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public String deleteUser(Long id){
        User user = userRepository.findUserById(id);
        userRepository.delete(user);
        return "User deleted successfully";
    }

    public User getUserbyId(Long id){
        User user = userRepository.findUserById(id);
        return user;
    }
    @Transactional
    public List<Role> getRoles(){
        return roleRepo.findAll();
    }


    /*public User updateUser(Long id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setRoles(user.getRoles());
            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }*/
    public User updateUser(Long id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());

            Set<Role> existingRoles = new HashSet<>();
            for (Role role : user.getRoles()) {
                Role existingRole = roleRepo.find(role.getName());

                if (existingRole != null) {
                    existingRoles.add(existingRole);
                }
            }
            existingUser.setRoles(existingRoles);

            return userRepository.save(existingUser);
        } else {
            return null;
        }
    }


    /** GESTION DES DEPARTEMENTS **/
    public Departement createDepartement(String name) {
        Departement departement = new Departement(name);
        return departementRepo.save(departement);
    }
    public List<Departement> getAllDepartments() {
        return departementRepo.findAll();
    }

    public void assignUserToDepartment(Long userId, Long departmentId) {
        Optional<User> user = userRepository.findById(userId);
        User u = user.get();
        Optional<Departement> department = departementRepo.findById(departmentId);
        Departement d = department.get();
        u.setDepartement(d);
        userRepository.save(u);
    }

    public List<User> getUsersWithoutDepartment(){
        return userRepository.findByDepartementIsNull();
    }

    public List<User> getUsersByDepartment(Long departmentId) {
        return userRepository.findByDepartmentId(departmentId);
    }

	/*public String getDepName(Long id){
		Departement dept = departementRepo.getDepartementById(id);
		return dept.getName();
	}*/

    public User removeDepartmentFromUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        User u = user.get();
        u.setDepartement(null);
        return userRepository.save(u);
    }

    public void deleteDepartement(Long departementId) {
        Optional<Departement> departement = departementRepo.findById(departementId);
        Departement d = departement.get();

        if (!d.getUsers().isEmpty()) {
            throw new IllegalStateException("Cannot delete the department. It has associated users .");
        }

        departementRepo.delete(d);
    }
    /** Dashboarding **/

    public long getUserCount() {
        return userRepository.count();
    }

    public long getDepartementCount() {
        return departementRepo.count();
    }

    public Map<String, Double> getRoleStatistics() {
        long totalUsers = userRepository.count();
        Map<String, Double> roleStatistics = new HashMap<>();

        for (ERole role : ERole.values()) {
            long count = userRepository.countByRoles_Name(role);
            double percentage = (count / (double) totalUsers) * 100;
            roleStatistics.put(role.name(), percentage);
        }

        return roleStatistics;
    }



    public Map<String, Long> getUserCountByDepartement() {
        Map<String, Long> userCountByDepartement = new HashMap<>();

        List<Departement> departements = departementRepo.findAll();
        for (Departement departement : departements) {
            long userCount = departement.getUsers().size();
            userCountByDepartement.put(departement.getName(), userCount);
        }

        return userCountByDepartement;
    }

}
