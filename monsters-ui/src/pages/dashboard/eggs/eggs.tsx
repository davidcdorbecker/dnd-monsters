import React from 'react'
import {Egg} from "../../../models/eggs_store";
import EggImage from '../../../static/egg.png'
import Box from "@mui/material/Box";
import CardActionArea from '@mui/material/CardActionArea';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useOutletContext} from "react-router-dom";

const EggsSection = () => {

    const {eggs, open} = useOutletContext<{ eggs: Egg[], open: any }>()

    return (
        <>
            {
                eggs.map((egg) =>
                    <CardActionArea component="a">
                        <Box onClick={() => open(egg)}>
                            <Card sx={{display: 'flex', flexDirection: 'row', marginBottom: '6px'}}>
                                <CardContent sx={{flex: 1}}>
                                    <Box
                                        component="img"
                                        src={EggImage}
                                        width="6rem"
                                    />
                                </CardContent>
                                <CardContent sx={{flex: 1}}>
                                    <Typography>Level: {egg.level}</Typography>
                                </CardContent>
                                <CardContent sx={{flex: 1}}>
                                    <Typography>Price: {egg.price.toFixed(2)}</Typography>
                                </CardContent>
                                <CardContent sx={{flex: 1}}>
                                    <Typography>Min level: {egg.minLevel}</Typography>
                                </CardContent>
                                <CardContent sx={{flex: 1}}>
                                    <Typography>Max level: {egg.maxLevel}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </CardActionArea>)
            }
        </>
    )
}

export default EggsSection