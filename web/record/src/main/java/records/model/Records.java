package records.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="records")
public class Records{
    @Id
    @Column(name="record_id" ,nullable=false)
        private String record_id;
        @Column(name="record_title",nullable=false)
        private String record_title;
        @Column(name="record_description",nullable=true)
        private String record_description;
        @Column(name="prescription",nullable=true)
        private String prescription;
        @Column(name="email",nullable=false)
        private String email;
}
