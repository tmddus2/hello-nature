import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PlantAPI({ navigation }) {
    const [plantInfo, setPlantInfo] = useState('')
    axios.get("http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=20220816QZULAZXDLRRFRNZZXG2CQA&cntntsNo=12938").then(
        res => {
            setPlantInfo(res.data);

        }
    )

    return (<>
    </>)
}