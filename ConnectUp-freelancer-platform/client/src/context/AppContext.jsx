import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "./MessageContext";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { axios, connectSocket } = useMessageContext();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gigs, setGigs] = useState([]);

  const [freelancerGigs, setFreelancerGigs] = useState([]);
  const [freelancerOrders, setFreelancerOrders] = useState([]);
  const [freelancerGigsToShow, setFreelancerGigsToShow] = useState([]);

  const [clientGigs, setClientGigs] = useState([]);
  const [clientOrders, setClientOrders] = useState([]);

  const [singleGig, setSingleGig] = useState(null);
  const [selectedFreelancerGig, setSelectedFreelancerGig] = useState(null);
  const [selectedClientGig, setSelectedClientGig] = useState(null);
  const [search, setSearch] = useState("");

  const [reviews, setReviews] = useState([]);

  //? for main website(mutual)
  const fetchAllGigs = async () => {
    try {
      const { data } = await axios.get("/api/gig/all");
      if (data.success) {
        setGigs(data.data);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const fetchFreelancersGig = async () => {
    try {
      const { data } = await axios.get("/api/gig/freelancer/all-gigs");
      if (data.success) {
        setFreelancerGigs(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFreelancersGigToShow = async () => {
    try {
      const { data } = await axios.get("/api/gig/all-gigs-to-show");
      if (data.success) {
        setFreelancerGigsToShow(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchClientGig = async () => {
    try {
      const { data } = await axios.get("/api/gig/client/all-gigs");

      if (data.success) {
        setClientGigs(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchClientOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/client-order");

      if (data.success) {
        setClientOrders(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFreelancerOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/freelancer-order");

      if (data.success) {
        setFreelancerOrders(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUser = async () => {
    const { data } = await axios.get("/api/user/get-details");
    if (data.success) {
      setUser(data.data);
      connectSocket(data.data);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        navigate("/");
        setUser(null);
        getUser();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSingleGig = async (id) => {
    try {
      const { data } = await axios.get(`/api/gig/one-gig/${id}`);

      if (data.success) {
        setSingleGig(data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchReview = async (id) => {
    try {
      const { data } = await axios.get(`/api/review/all-review/${id}`);
      setReviews(data?.data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAllGigs();
    getUser();
  }, []);

  const value = {
    user,
    navigate,
    axios,
    setUser,
    setLoading,
    loading,
    gigs,
    clientOrders,
    getUser,
    fetchFreelancersGig,
    fetchClientGig,
    freelancerGigs,
    clientGigs,
    search,
    setSearch,
    logout,
    fetchAllGigs,
    fetchSingleGig,
    singleGig,
    fetchClientOrders,
    fetchFreelancerOrders,
    freelancerOrders,
    selectedFreelancerGig,
    setSelectedFreelancerGig,
    selectedClientGig,
    setSelectedClientGig,
    fetchReview,
    reviews,
    fetchFreelancersGigToShow,
    freelancerGigsToShow,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext(AppContext);
}
