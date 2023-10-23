import { useEffect } from "react";

import "./styles.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ColorModeContextProvider } from "./context/ColorModeContext";

import ResponsiveAppBar from "./componets/header/ResponsiveAppBar";

import ErrorPage from "./pages/Error";
import TraysPage from "./pages/Trays";
import MockTray from "./pages/MockTray";
import LocationsPage from "./pages/Locations";
import PlantsPage from "./pages/Plants";
import DashboardPage from "./pages/Dashboard";
import LocationPage from "./pages/Location";
import PlantPage from "./pages/Plant";
import ProfilePage from "./pages/Profile";

import SigninPage from "./pages/Signin";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import { auth } from "./firebase-config";

// Look into this for protected routs,
// home page public and profile page private.
export default function App() {
  const Layout = () => (
    <>
      <AuthProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <Outlet />
        </ColorModeContextProvider>
      </AuthProvider>
    </>
  );

  const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    console.log(isLoading)

    useEffect(() => {
      console.log("isLoading")

      if (!auth.currentUser && !isLoading) {
        return navigate("/");
      }
    });

    return (
      <>
        <ResponsiveAppBar />
        {children}
      </>
    );
  };

  const UnprotectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (auth.currentUser) {
        return navigate("/dashboard");
      }
    });
    return children;
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: (
            <UnprotectedRoute>
              <SigninPage />
            </UnprotectedRoute>
          ),
          errorElement: <ErrorPage />
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          )
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/locations",
          element: (
            <ProtectedRoute>
              <LocationsPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/plants",
          element: (
            <ProtectedRoute>
              <PlantsPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/trays",
          element: (
            <ProtectedRoute>
              <TraysPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/locations/:locationUid",
          element: (
            <ProtectedRoute>
              <LocationPage />
            </ProtectedRoute>
          )
        },
        {
          path: "/plants/:plantUid",
          element: (
            <ProtectedRoute>
              <PlantPage />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
