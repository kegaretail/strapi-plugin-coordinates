import React, { useState, useEffect, useMemo } from 'react'

import { TextInput } from '@strapi/design-system';
import { Grid, GridItem } from '@strapi/design-system/Grid';

import styled from 'styled-components';

const Title = styled.h5`
    color: #333740;
    font-weight: bold;
    font-size: 14px;
`;

const Coordinates = ({
    value,
    onChange,
    name,
    intlLabel,
    required,
    attribute,
    description,
    disabled,
    error
  }) => {

    const initualValue = useMemo(() => {
        try {
            return JSON.parse(value || '{}')
        } catch (e) {
            return {
                latitude: 0,
                longitude: 0
            }
        }
    }, [value])

    const [ latitude, setLatitude ] = useState((initualValue?.latitude ? initualValue.latitude : 0));
    const [ longitude, setLongitude ] = useState((initualValue?.longitude ? initualValue.longitude : 0));

    const [ latitudeError, setLatitudeError ] = useState(false);
    const [ longitudeError, setLongitudeError ] = useState(false);

    useEffect(() => {
        onChange({
            target: {
                name: name,
                value: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude
                }),
                type: attribute.type,
            },
        })
    }, [ latitude, longitude ])

    return (
        <Grid gap={2}>
            <GridItem col={12}><Title>{ intlLabel?.defaultMessage || '' }</Title></GridItem>
            <GridItem col={6}>
                <TextInput 
                    name="latitude"
                    label="Latitude"
                    type="number"
                    onChange={({ target: {  value } }) => {
                        if (value === '') {
                            setLatitudeError(true)
                        } else {
                            setLatitudeError(false)
                            setLatitude(value);
                        }
                    }}
                    value={latitude}
                    disabled={disabled}
                    required={required}
                    error={latitudeError}
                />
            </GridItem>
            <GridItem col={6}>
                <TextInput 
                    name="longitude"
                    label="Longitude"
                    type="number"
                    onChange={({ target: {  value } }) => {
                        if (value === '') {
                            setLongitudeError(true)
                        } else {
                            setLongitudeError(false)
                            setLongitude(value);
                        }
                    }}
                    value={longitude}
                    disabled={disabled}
                    required={required}
                    error={longitudeError}
                />
            </GridItem>
            
            {
                latitude !== 0 && longitude !== 0
                &&
                <GridItem col={12}>
                    <a href={"https://www.google.com/maps/search/?api=1&query=" + latitude + ","+ longitude} target="_BLANK">Bekijk op Google maps</a>
                </GridItem>
            }
            
        </Grid>
    );
}

export default Coordinates;