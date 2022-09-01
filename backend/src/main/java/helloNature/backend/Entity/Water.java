package helloNature.backend.Entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Builder
//@Table(name = "WATER_INFO")
public class Water {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //@MapsId
    //@JoinColumn
    private Plant plant;



    private String latest_water_date; // 가장 최근 물 준 날

    private String expected_water_date; // 다음으로 물 줘야하는 날

    private Boolean water_condition; // 물 주기로 한 날 == 물 준 날 ? true : false


}
