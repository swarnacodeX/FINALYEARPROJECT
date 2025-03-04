package records.repository;

import records.model.Records;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RecordsRepository extends JpaRepository<Records, String> {
    List<Records> findByEmail(String email);
    List<Records> findAll();
    Optional<Records> findById(String record_id);
}