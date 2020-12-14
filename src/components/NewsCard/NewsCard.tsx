import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles';
import classNames from 'classnames';

export interface NewsCardProps {
    article: Article; 
    index: number,
    activeActicle: number
}

const newsTumbnail = 'https://elements-video-cover-images-0.imgix.net/files/303250403/1920x1080.jpg?auto=compress%2Cformat&fit=min&h=394&w=700&s=6aebb3a41a2292bf70ee7dfdb5aa6086';
 
const NewsCard: React.SFC<NewsCardProps> = ({ article: {description, publishedAt, source, title, url, urlToImage }, 
    index, activeActicle }) => {

    const classes = useStyles();
    const [elRefs, setElRefs]: [any[], Function] = useState([]);
    const scrollToRef = (ref: any) => {
        window.scroll(0, ref.current.offsetTop - 50);
    }

    useEffect(() => {
        setElRefs((refs: any) => Array(20).fill('').map((_, item) => refs[item] || createRef()))
    },[]);

    useEffect(() => {
        if(index === activeActicle && elRefs[activeActicle]){
            scrollToRef(elRefs[activeActicle]);
        }
    },[activeActicle, index, elRefs])

    return ( 
       <Card ref={elRefs[index]} className={classNames(classes.card, activeActicle === index && classes.activeCard)}>
           <CardActionArea href={url} target='_blank'>
               <CardMedia className={classes.media} image={urlToImage || newsTumbnail}/>
               <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
               </div>
               <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
               <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
               </CardContent>
           </CardActionArea>
           <CardActions className={classes.cardActions}>
               <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{index + 1}</Typography>
           </CardActions>
       </Card>
     );
}
 
export default NewsCard;