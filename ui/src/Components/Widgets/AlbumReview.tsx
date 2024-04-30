import { Card, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { useState, useEffect } from 'react';
import axios from 'axios';

type AlbumList = Array<Album>
type Album = {
    Title: string
    ArtistsString: string
    ReleaseYear: string
    CoverImage: string
    HaveVinyl: boolean
    Rating: number
}
export default function AlbumReviewWidget() {
    const [albums, setAlbums] = useState<AlbumList>([]);

    const getAlbumReviews = async () => {
        try {
            console.log("Calling album review api to get albums...")
            const response = await axios.get("/api/album-reviews")
            setAlbums(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAlbumReviews();

        const intervalCall = setInterval(() => {
            getAlbumReviews();
        }, 30000 * 25); // 30 sec per album, 25 albums
        return () => {
            clearInterval(intervalCall);
        };
    }, []);


    const carouselStyle = {
        height: "100% !important",
        width: "100% !important",
        textAlign: "center",
        "& div": {
            height: "100% !important",
            width: "100% !important",
        },
    }
    return (
        <Carousel
            animation={"slide"}
            fullHeightHover={false}
            interval={30000}
            duration={500}
            navButtonsAlwaysInvisible
            indicators={false}
            sx={carouselStyle}
            autoPlay={true}
            stopAutoPlayOnHover={false}

        >
            {
                albums?.map((album, i) => (
                    <Card key={i} sx={{
                        height: "100%", p: 2, backgroundColor:"primary.main"
                    }}>
                        <img height="70%" alt={`Album cover for ${album.Title}`} src={album?.CoverImage}></img>
                        <Typography variant="h2">{album?.Rating}</Typography>
                    </Card>
                ))
            }
        </Carousel>

    )
}

