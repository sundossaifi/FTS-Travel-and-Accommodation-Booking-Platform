import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
    fetchHotelGallery,
    fetchHotelDetails,
    fetchHotelReviews,
    fetchAvailableRooms
} from "../../services/hotelService";
import { GalleryImage, HotelDetails, Review } from "../../types/hotel";
import { Room } from "../../types/room";
import HotelGallery from "../../components/HotelGallery";
import HotelInfo from "../../components/HotelInfo";
import HotelDetailsComponent from "../../components/HotelDetailsComponent";
import AvailableRooms from "../../components/AvailableRooms";
import ReviewCard from "../../components/ReviewCard";
import Footer from "../../components/Footer";
import { useSearch } from "../../context/SearchContext";
import styles from "./Hotel.module.css";
import { Box, Button, Typography } from "@mui/material";
import DetailsHeader from "../../components/DetailsHeader/DetailsHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Hotel() {
    const { id } = useParams<{ id: string }>();

    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const { checkInDate, checkOutDate } = useSearch();

    const roomsSectionRef = useRef<HTMLDivElement | null>(null);
    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

    function scrollToReviews() {
        if (roomsSectionRef.current) {
            roomsSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }


    useEffect(() => {
        async function loadData() {
            if (!id) {
                setError("Invalid hotel ID. Please check the URL.");
                return;
            }

            try {
                // Fetch gallery images
                const images: GalleryImage[] = await fetchHotelGallery(id);
                const imageUrls = images.map((image) => image.url);
                setGalleryImages(imageUrls);

                // Fetch hotel details
                const details: HotelDetails = await fetchHotelDetails(id);
                setHotelDetails(details);

                // Fetch reviews
                const hotelReviews: Review[] = await fetchHotelReviews(id);
                setReviews(hotelReviews);
                //Fetch available rooms
                if (checkInDate && checkOutDate) {
                    const availableRooms: Room[] = await fetchAvailableRooms(id, checkInDate, checkOutDate);
                    setRooms(availableRooms);
                }

                setError(null);
            } catch (err) {
                console.error("Error loading hotel data:", err);
                setError("Failed to load hotel data.");
            }
        }

        loadData();
    }, [id, checkInDate, checkOutDate]);

    if (error) {
        return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
    }

    return (
        <div className={styles.hotelPageContainer}>
            {hotelDetails && (
                <DetailsHeader title={hotelDetails?.hotelName} />
            )}
            <div className={styles.hotelDetailsContainer}>
                <div style={{ width: "80%" }}>
                    {hotelDetails && (
                        <HotelInfo
                            hotelLocation={hotelDetails.location}
                            starRating={hotelDetails.starRating}
                            reviewsCount={reviews.length}
                            onReserveClick={scrollToReviews}
                        />
                    )}
                    <HotelGallery images={galleryImages} />
                    {hotelDetails && (
                        <HotelDetailsComponent
                            hotelDescription={hotelDetails.description}
                            lat={hotelDetails.latitude}
                            lng={hotelDetails.longitude}
                            amenities={hotelDetails.amenities}
                        />
                    )}

                    {rooms.length > 0 && hotelDetails && (
                        <div ref={roomsSectionRef}>
                            <AvailableRooms rooms={rooms} hotelName={hotelDetails.hotelName} />
                        </div>

                    )}

                    {reviews.length > 0 && (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                mt: "3rem",
                            }}>
                            <Typography variant="h2" gutterBottom sx={{
                                fontSize: "26px",
                                fontWeight: "700",
                                lineHeight: "36px",
                                mb: "2rem"
                            }}>
                                Reviews
                            </Typography>
                            {displayedReviews.map((review) => (
                                <ReviewCard
                                    key={review.reviewId}
                                    customerName={review.customerName}
                                    rating={review.rating}
                                    description={review.description}
                                />
                            ))}
                            {reviews.length > 3 && (
                                <Button
                                    onClick={() => setShowAllReviews(!showAllReviews)}
                                    variant="text"
                                    sx={{
                                        width: "fit-content",
                                        mt: 2,
                                        textTransform: "none",
                                        color: "#000",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {showAllReviews ? <ExpandLessIcon sx={{ mr: 1 }} /> : <ExpandMoreIcon sx={{ mr: 1 }} />}
                                    {showAllReviews ? "Show Less" : "Show More"}
                                </Button>
                            )}
                        </Box>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
