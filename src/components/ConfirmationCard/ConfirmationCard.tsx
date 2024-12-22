import { Card, CardContent, Typography, Grid2, Divider, Box, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { BookingDetails } from "../../types/booking";
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ConfirmationCardProps {
    bookingDetails: BookingDetails;
}

interface InfoBoxProps {
    description: string;
    value: string;

}

export default function ConfirmationCard({ bookingDetails }: ConfirmationCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);


    async function handleSaveAsPdf() {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("confirmation-card.pdf");
        }
    }

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ width: "100%", mt: 6 }}>
            <Card ref={cardRef} sx={{ width: { xs: "80%", md: "70%" }, padding: 2, borderRadius: "20px" }}>
                <CardContent>
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={handleSaveAsPdf}>
                            <SaveAltIcon />
                        </IconButton>
                    </Box>
                    <Grid2 container spacing={2} alignItems="center">
                        <Grid2 size={{ xs: 12, sm: 6 }} display="flex" alignItems="center">
                            <Box
                                sx={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 2,
                                }}
                            >
                                <CheckCircleIcon sx={{ fontSize: "50px", color: '#4CBB7F' }} />
                            </Box>
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Your Booking was submitted successfully!
                                </Typography>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 1 }}>
                            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, height: "200px" }} />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                            <Box display={"flex"} flexDirection={"column"} gap={1}>
                                <InfoBox description={'Customer Name:'} value={bookingDetails.customerName} />
                                <InfoBox description={'Hotel Name:'} value={bookingDetails.hotelName} />
                                <InfoBox description={'Room Number:'} value={bookingDetails.roomNumber} />
                                <InfoBox description={'Room Type:'} value={bookingDetails.roomType} />
                                <InfoBox description={'Booking Date:'} value={new Date(bookingDetails.bookingDateTime).toLocaleString()} />
                                <InfoBox description={'Total Cost:'} value={bookingDetails.totalCost.toString()} />
                                <InfoBox description={'Payment Method:'} value={bookingDetails.paymentMethod} />
                                <InfoBox description={'Booking Status:'} value={bookingDetails.bookingStatus} />
                                <InfoBox description={'Confirmation Number:'} value={bookingDetails.confirmationNumber} />
                            </Box>
                        </Grid2>
                    </Grid2>
                </CardContent>
            </Card>
        </Box>
    )
}

function InfoBox({ description, value }: InfoBoxProps) {
    return (
        <Box display={"flex"} sx={{ width: "100%" }}>
            <Typography sx={{ color: "#5e6d77", fontSize: "16px", fontWeight: "400" }}>{description}</Typography>
            <Typography sx={{ color: "#232323", fontSize: "16px", fontWeight: "bold" }}> {value}</Typography>
        </Box>
    )
}

