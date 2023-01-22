import React from 'react'
import Grid from "@mui/material/Grid";
import MonsterCard from "./monster-card";
import Typography from "@mui/material/Typography";
import {useOutletContext} from "react-router-dom";

const MonstersSection = () => {

    const {monsters} = useOutletContext<{monsters: any[]}>()

    return <Grid container spacing={1}>
        {monsters.length > 0
        ? monsters.map((monster) => (
                <MonsterCard key={monster.name} post={{
                    size: `${monster.size} CR ${monster.challenge_rating}`,
                    description: monster.actions[0].desc,
                    image: `https://www.dnd5eapi.co${monster.image}`,
                    imageLabel: monster.name,
                    title: monster.name,
                    count: monster.count
                }}/>
            ))
        : <Typography component="h2" variant="h5" marginTop={"2rem"}>You have no monsters yet</Typography>}
    </Grid>
}

export default MonstersSection