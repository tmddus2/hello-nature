package helloNature.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Builder
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;

    private String bring_date;

    private String picture;

    private String scientific_name;

    private String memo;

    private Long water_cycle;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "plant_id")
    private List<Schedule> scheduleList;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;



    /*
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "plant")//(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "plant")
    private Water water;
     */


}
