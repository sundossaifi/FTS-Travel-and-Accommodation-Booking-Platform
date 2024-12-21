import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

 
