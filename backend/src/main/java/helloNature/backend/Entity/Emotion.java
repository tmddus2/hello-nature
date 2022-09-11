package helloNature.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Builder
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long plant_id;

    private Timestamp time;




}
