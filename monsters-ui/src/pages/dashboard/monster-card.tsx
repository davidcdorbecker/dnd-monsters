import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
interface FeaturedPostProps {
    post: {
        size: string;
        description: string;
        image: string;
        imageLabel: string;
        title: string;
    };
}

export default function MonsterCard(props: FeaturedPostProps) {
    const {post} = props;

    return (
        <Grid item xs={6} md={3}>
            <CardActionArea component="a">
                <Card sx={{display: 'flex', height: '22rem', flexDirection: 'column'}}>
                    <CardContent sx={{width: '100%'}}>
                        <Typography component="h2" variant="h5">
                            {post.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {post.size}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{width: '100%', height: '100%', maxHeight: '100%', maxWidth: '100%'}}
                        image={post.image}
                        alt={post.imageLabel}
                    />
                </Card>
            </CardActionArea>
        </Grid>
    );
}