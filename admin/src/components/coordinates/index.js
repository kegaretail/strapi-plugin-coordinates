import React, { useState, useEffect } from 'react';

import { Inputs } from '@buffetjs/custom';

import styled from 'styled-components';

const Title = styled.h5`
    margin-bottom: 1rem;
    color: #333740;
    font-weight: bold;
`;

const Coordinates = ({ name, onChange, value, label, autoComplete }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {

        if (value !== null) {
            let coordinates = null;
            if (value.id) {
                coordinates = value.id.coordinates;
            } else {
                coordinates = value.coordinates;
            }

            setLongitude(coordinates[0]);
            setLatitude(coordinates[1]);
            
        }

    }, [value])

    const onInputChange = ({ target: { name: targetname, value } }) => {

        // WORKAROUND: add data to { id: {data} } so it gets added as object
        onChange({ target: { name: name, value: { id: {
                "type": "Point",
                "coordinates": [ ( targetname === 'longitude' ? value : longitude), ( targetname === 'latitude' ? value : latitude) ]
            } 
        }}});

        if (name === 'longitude') {
            setLongitude(value);
        } else {
            setLatitude(value);
        }

    }

    return (
        <div class="row">

            <div class="col-12">
                <Title>{ label }</Title>
            </div>

            <div class="col-6">
                <Inputs
                    name="latitude"
                    label="Latitude"
                    type="number"
                    onChange={onInputChange}
                    value={latitude}
                    autocomplete={autoComplete}
                />
            </div>

            <div class="col-6">
                <Inputs
                    name="longitude"
                    label="Longitude"
                    type="number"
                    onChange={onInputChange}
                    value={longitude}
                    autocomplete={autoComplete}
                />
            </div>

        </div>
    );
};

export default Coordinates;