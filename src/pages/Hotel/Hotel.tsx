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

    const [galleryError, setGalleryError] = useState<string | null>(null);
    const [detailsError, setDetailsError] = useState<string | null>(null);
    const [reviewsError, setReviewsError] = useState<string | null>(null);
    const [roomsError, setRoomsError] = useState<string | null>(null);

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
                setDetailsError("Invalid hotel ID. Please check the URL.");
                return;
            }

            console.log("Fetching hotel data for ID:", id);

            // Fetch gallery images
            try {
                const images: GalleryImage[] = await fetchHotelGallery(id);
                setGalleryImages(images.map((image) => image.url));
                setGalleryError(null);
            } catch (err) {
                console.warn("Gallery fetch failed:", err);
                setGalleryError("Failed to load hotel gallery.");
            }

            // Fetch hotel details
            try {
                const details: HotelDetails = await fetchHotelDetails(id);
                setHotelDetails(details);
                setDetailsError(null);
            } catch (err) {
                console.warn("Hotel details fetch failed:", err);
                setDetailsError("Failed to load hotel details.");
            }

            // Fetch reviews
            try {
                const hotelReviews: Review[] = await fetchHotelReviews(id);
                setReviews(hotelReviews);
                setReviewsError(null);
            } catch (err) {
                console.warn("Reviews fetch failed:", err);
                setReviewsError("Failed to load reviews.");
            }

            // Fetch available rooms only if check-in and check-out dates exist
            if (checkInDate && checkOutDate) {
                try {
                    const availableRooms: Room[] = await fetchAvailableRooms(id, checkInDate, checkOutDate);
                    setRooms(availableRooms);
                    setRoomsError(null);
                } catch (err) {
                    console.warn("Available rooms fetch failed:", err);
                    setRoomsError("Failed to load available rooms.");
                }
            }
        }

        loadData();
    }, [id, checkInDate, checkOutDate]);

    return (
        <div className={styles.hotelPageContainer}>
            {/* Header */}
            {hotelDetails && <DetailsHeader title={hotelDetails.hotelName} />}

            <div className={styles.hotelDetailsContainer}>
                <div style={{ width: "80%" }}>

                    {/* Hotel Info Section */}
                    {hotelDetails ? (
                        <HotelInfo
                            hotelLocation={hotelDetails.location}
                            starRating={hotelDetails.starRating}
                            reviewsCount={reviews.length}
                            onReserveClick={scrollToReviews}
                        />
                    ) : (
                        <Typography color="error" align="center">
                            {detailsError}
                        </Typography>
                    )}

                    {/* Gallery Section */}
                    {galleryImages.length > 0 ? (
                        <HotelGallery images={galleryImages} />
                    ) : (
                        <Typography color="error" align="center">
                            {galleryError}
                        </Typography>
                    )}

                    {/* Hotel Details Component */}
                    {hotelDetails ? (
                        <HotelDetailsComponent
                            hotelDescription={hotelDetails.description}
                            lat={hotelDetails.latitude}
                            lng={hotelDetails.longitude}
                            amenities={hotelDetails.amenities}
                        />
                    ) : null}

                    {/* Available Rooms Section */}
                    {rooms.length > 0 ? (
                        <div ref={roomsSectionRef}>
                            <AvailableRooms rooms={rooms} hotelName={hotelDetails?.hotelName || ""} />
                        </div>
                    ) : (
                        <Typography color="error" align="center">
                            {roomsError}
                        </Typography>
                    )}

                    {/* Reviews Section */}
                    {reviews.length > 0 ? (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                mt: "3rem",
                            }}
                        >
                            <Typography
                                variant="h2"
                                gutterBottom
                                sx={{
                                    fontSize: "26px",
                                    fontWeight: "700",
                                    lineHeight: "36px",
                                    mb: "2rem"
                                }}
                            >
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
                    ) : (
                        <Typography color="error" align="center">
                            {reviewsError}
                        </Typography>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
