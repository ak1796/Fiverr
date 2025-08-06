import React from "react";
import { assest } from "./assets/assests";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import WhyChose from "./components/WhyChose";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loading from "./components/Loading";
import Freelancer from "./pages/freelancerComp/Freelancer";
import DashBoard from "./pages/freelancerComp/DashBoard";
import Gigs from "./pages/freelancerComp/Gigs";
import Earnings from "./pages/freelancerComp/Earnings";
import Profile from "./pages/freelancerComp/Profile";
import Client from "./pages/clientComp/Client";
import ClientDashBoard from "./pages/clientComp/ClientDashBoard";
import Orders from "./pages/clientComp/Orders";
import ClientProfile from "./pages/clientComp/ClientProfile";
import CreateGig from "./pages/freelancerComp/CreateGig";
import IndividualGig from "./pages/freelancerComp/IndividualGig";
import MoreInformations from "./pages/freelancerComp/MoreInformations";
import Services from "./components/Services";
import IndividualGigInfo from "./components/IndividualGigInfo";
import PlaceOrders from "./pages/PlaceOrders";
import Project from "./pages/clientComp/Project";
import Details from "./pages/clientComp/Details";
import Review from "./pages/clientComp/Review";
import ViewDetails from "./pages/freelancerComp/ViewDetails";
import AllReview from "./pages/freelancerComp/AllReview";
import UpdateGig from "./pages/freelancerComp/UpdateGig";
import ChatOutlet from "./pages/chat/ChatOutlet";

const App = () => {
  const { setLoading, loading } = useAppContext();

  if (loading) return <Loading />;

  return (
    <>
      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/why-connect" element={<WhyChose />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<IndividualGigInfo />} />
            <Route path="/place-orders" element={<PlaceOrders />} />
          </Route>
          <Route path="/freelancer" element={<Freelancer />}>
            <Route index element={<DashBoard />} />
            <Route path="all-gigs" element={<Gigs />} />
            <Route path="create-gig" element={<CreateGig />} />
            <Route path="update-gig" element={<UpdateGig />} />
            <Route path=":id" element={<IndividualGig />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="freelancer-profile" element={<Profile />} />
            <Route path="more-info" element={<MoreInformations />} />
            <Route path="details/:id" element={<ViewDetails />} />
            <Route path="review/:id" element={<AllReview />} />
            <Route path="messages" element={<ChatOutlet />} />
          </Route>
          <Route path="/client" element={<Client />}>
            <Route index element={<ClientDashBoard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="client-profile" element={<ClientProfile />} />
            <Route path="projects" element={<Project />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="review" element={<Review />} />
            <Route path="messages" element={<ChatOutlet />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
