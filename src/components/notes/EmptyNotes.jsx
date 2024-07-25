import React from 'react'

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Box, styled, Typography } from '@mui/material';

const Light = styled(LightbulbOutlinedIcon)`
    font-size: 120px;
    color: #f5f5f5;
`

const Text =  styled(Typography)`
    color: #80868b;
    font-size: 22px;
`

const Container = styled(Box)`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh;
    
    `

const EmptyNotes = () => {
    return (
        <>
            <Container>
                <Light />
                <Text>
                    Notes you add appear here
                </Text>
            </Container>
        </>
    )
}

export default EmptyNotes