import logo from "./logo.png";
import background_img from "./bg.png";
import graphics_img from "./graphics.jpg";
import security_img from "./security.jpg";
import website_img from "./website.jpg";
import avatar from "./avatar_icon.png";

export const assest = {
  logo,
  background_img,
  graphics_img,
  security_img,
  website_img,
  avatar,
};

export const gigsDetails = [
  {
    title: "Logo Design",
    description: "Craft a minimalist and professional logo for startups.",
    price: 1500,
    deliveryTime: 3,
    images: "/images/logo1.png",
    category: "Design",
    inProgress: false,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
  {
    title: "Full Stack Web App",
    description: "Build a scalable MERN-based platform for freelancers.",
    price: 10000,
    deliveryTime: 14,
    images: "/images/webapp.png",
    category: "Development",
    inProgress: true,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
  {
    title: "SEO Optimization",
    description: "Improve Google rankings with full SEO audit and fixes.",
    price: 2500,
    deliveryTime: 5,
    images: "/images/seo.png",
    category: "Marketing",
    inProgress: true,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
  {
    title: "Social Media Kit",
    description: "Design engaging posts and banners for Instagram & LinkedIn.",
    price: 1800,
    deliveryTime: 4,
    images: "/images/social.png",
    category: "Design",
    inProgress: false,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
  {
    title: "API Integration",
    description: "Connect third-party APIs securely and reliably.",
    price: 3200,
    deliveryTime: 6,
    images: "/images/api.png",
    category: "Development",
    inProgress: true,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
  {
    title: "Brand Identity",
    description:
      "Develop complete branding: logo, colors, and typography guide.",
    price: 6000,
    deliveryTime: 10,
    images: "/images/branding.png",
    category: "Design",
    inProgress: false,
    createdBy: "64d32aef92a4b927c3981ab2",
  },
];

export const ordersDetails = [
  {
    _id: "64ccf1d2e7c5a951e2a847a1",
    gig: "64ccf1d2e7c5a951e2a84710",
    client: "64ccf1d2e7c5a951e2a84711",
    freelancer: "64ccf1d2e7c5a951e2a84712",
    status: "pending",
    createdAt: "2025-07-28T10:32:14.123Z",
    updatedAt: "2025-07-28T10:32:14.123Z",
    price: "$500",
  },
  {
    _id: "64ccf1d2e7c5a951e2a847a2",
    gig: "64ccf1d2e7c5a951e2a84713",
    client: "64ccf1d2e7c5a951e2a84714",
    freelancer: "64ccf1d2e7c5a951e2a84715",
    status: "inprogress",
    createdAt: "2025-07-28T13:20:45.679Z",
    updatedAt: "2025-07-28T14:01:30.541Z",
    price: "$500",
  },
  {
    _id: "64ccf1d2e7c5a951e2a847a3",
    gig: "64ccf1d2e7c5a951e2a84716",
    client: "64ccf1d2e7c5a951e2a84717",
    freelancer: "64ccf1d2e7c5a951e2a84718",
    status: "delivered",
    createdAt: "2025-07-27T08:44:01.900Z",
    updatedAt: "2025-07-28T09:12:21.110Z",
    price: "$500",
  },
  {
    _id: "64ccf1d2e7c5a951e2a847a4",
    gig: "64ccf1d2e7c5a951e2a84719",
    client: "64ccf1d2e7c5a951e2a8471A",
    freelancer: "64ccf1d2e7c5a951e2a8471B",
    status: "completed",
    createdAt: "2025-07-25T18:20:11.901Z",
    updatedAt: "2025-07-26T10:01:00.101Z",
    price: "$500",
  },
];
