
//farmer routes
import Deals from "layouts/pages/Farmers/MyDeals/index"
import AddDeal from "layouts/pages/Farmers/MyDeals/AddDeal"
import EditDeal from "layouts/pages/Farmers/MyDeals/EditDeal"
import AddFarm from "layouts/pages/Farmers/MyFarms/AddFarm"
import EditFarm from "layouts/pages/Farmers/MyFarms/EditFarm"
import MyTrash from "layouts/pages/Farmers/MyTrash"
import Farmers from "layouts/pages/Farmers/MyFarms"

import EditProfile from 'layouts/pages/Profile/EditProfile'
import Profile from 'layouts/pages/Profile/Profile';


import Icon from "@mui/material/Icon";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';


import FarmDescription from 'layouts/pages/Landing/AllFarms/farmDescription'
import InvestorDescription from 'layouts/pages/Landing/AllInvestors/InvestorDescription'

// Pages
// import AboutUs from "layouts/pages/landing-pages/about-us";
// import ContactUs from "layouts/pages/landing-pages/contact-us";
// Sections

//investor routes
import Investors from "layouts/pages/Landing/AllInvestors"
import SignOut from "layouts/pages/sign-out/index";
import UserProfile from "layouts/pages/Profile/Profile";
import AddRequest from "layouts/pages/Investors/MyRequests/AddRequests";
import EditRequest from "layouts/pages/Investors/MyRequests/EditRequest";
import InvestorDeals from "layouts/pages/Investors/MyDeals/index";
import InvestorAddDeal from "layouts/pages/Investors/MyDeals/AddDeal";
import InvestorEditDeal from "layouts/pages/Investors/MyDeals/EditDeal";
import Trash from 'layouts/pages/Investors/trash';
import Requests from 'layouts/pages/Investors/MyRequests';

// Sections

import Farms from "layouts/pages/Landing/AllFarms/index"
import Home from "layouts/pages/Home"
import SignUp from "layouts/pages/Sign-up";
import SignIn from "layouts/pages/Sign-in";

import { useContext } from "react"
import { AuthContext } from "context/AuthContext";

function MyRoutes() {
  const ctx = useContext(AuthContext)
  console.log("ctxxx", ctx)
  const routes = [
    {
      name: "Home",
      key: "Home",
      icon: <HomeIcon />,
      route: "/presentation",
      component: <Home />,
    },
    {
      name: "Find",
      icon: <SearchIcon />,

      collapse: [
        {
          name: "Find Farms",
          key: "find-farms",

          route: "/farms",
          component: <Farms />,
        },
        {
          name: "Find Investors",
          key: "find-investor",

          route: "/investors",
          component: <Investors />,
        },
        {
          name: "Find Agents",
          key: "find-agents",

          route: "/presentation",
          component: <Home />,
        },
      ],
    },

    {
      name: "Guide",
      key: "guide",

      icon: <MenuBookIcon />,
      route: "/presentation",
      component: <Home />,
    },
    {
      name: "Account",
      icon: <GroupAddIcon />,


      collapse: [
        {
          name: "Sign-In",
          key: "sign-in",

          route: "/Sign-in",
          icon: <LoginIcon />,
          component: <SignIn />,
        },
        {
          name: "Sign-Up",
          key: "sign-up",

          route: "/Sign-Up",
          component: <SignUp />,
        },

      ],
    },


  ];


  const greenhand = [
    {
      name: "farms/description",
      key: "farm-description",

      route: "/farms/description/:id",
      component: <FarmDescription />,
    },
    {
      name: "investor/description",
      key: "investor-description",

      route: "/investor/description/:id",
      component: <InvestorDescription />,
    },
    {
      name: "myFarms/description",
      key: "myfarm-description",
      route: "/myFarms/description/:id",
      component: <FarmDescription />,
    },
  ]


  if (window.localStorage.getItem("userTypeId") == 2) {
    routes.pop(
      {
        name: "Account",
        icon: <GroupAddIcon />,


        collapse: [
          {
            name: "Sign-In",
            key: "sign-in",

            route: "/Sign-in",
            icon: <LoginIcon />,
            component: <SignIn />,
          },
          {
            name: "Sign-Up",
            key: "sign-up",

            route: "/Sign-Up",
            component: <SignUp />,
          },

        ],
      },
    )
    routes.push({
      // name: "Account",
      icon: <Icon fontSize="small">account_circle</Icon>,

      collapse: [
        {
          name: "Profile",
          key: 'profile',
          route: "/Profile",
          component: <Profile />,
        },
        {
          name: "My Farms",
          key: 'my-farms',
          route: "/My_Farms",
          component: <Farmers />,
        },
        {
          name: "My Deals",
          key: 'mt-deals',
          route: "/My_deals",
          component: <Deals />,
        },
        {
          name: "My Trash",
          key: 'my-trash',
          route: "/My_Trash",
          component: <MyTrash />,
        },
        {
          name: "Sign out",
          key: 'sign-out',
          route: "/Sign-out",
          component: <SignOut />,
        },

      ],

    },
    )
    greenhand.push({
      name: "deal/add",
      key: 'add-deal',
      route: "/deal/add",
      component: <AddDeal />,
    },
      {
        name: "deal/edit",
        key: 'edit-deal',
        route: "/deal/edit/:id",
        component: <EditDeal />,
      },
      {
        name: "add farm",
        key: 'add-farm',
        route: "/farm/add",
        component: <AddFarm />,
      },
      {
        name: "edit-farm",
        key: 'edit-farm',
        route: "/farm/edit/:id",
        component: <EditFarm />,
      },
      {
        name: "editProfile",
        key: 'edit-profile',
        route: "profile/edit",
        component: <EditProfile />,
      },
      {
        name: "myFarms/description",
        key: "myfarm-description",
        route: "/myFarms/description/:id",
        component: <FarmDescription />,
      },
    )


  } else if (window.localStorage.getItem("userTypeId") == 3) {
    routes.pop(
      {
        name: "Account",
        icon: <GroupAddIcon />,


        collapse: [
          {
            name: "Sign-In",
            key: "sign-in",
            route: "/Sign-in",
            icon: <LoginIcon />,
            component: <SignIn />,
          },
          {
            name: "Sign-Up",
            key: "sign-up",
            route: "/Sign-Up",
            component: <SignUp />,
          },

        ],
      },
    )
    routes.push(
      {
        //name: "Accountttt",
        icon: <Icon fontSize="small">account_circle</Icon>,


        collapse: [
          {
            name: "Profile",
            key: 'investor-profile',
            route: "/profile",
            component: <UserProfile />,
          },
          {
            name: "My Requests",
            key: 'imy-requests',
            route: "/my-requests",
            component: <Requests />,
          },
          {
            name: "My Deals",
            key: 'my-deals',
            route: "/my-deals",
            component: <InvestorDeals />,
          },
          {
            name: "My Trash",
            key: 'investor-trash',
            route: "/my-trash",
            component: <Trash />,
          },
          {
            name: "Sign-out",
            key: 'sign-out',
            route: "/sign-out",
            component: <SignOut />,
          },

        ],
      },
    )
    greenhand.push(
      {
        name: "requests/add",
        route: "/requests/add/:id",
        component: <AddRequest />,
      },
      {
        name: "requests/edit",
        route: "/requests/edit/:id",
        component: <EditRequest />,
      },
      {
        name: "deals/add",
        route: "/deals/add",
        component: <InvestorAddDeal />,
      },
      {
        name: "deal/edit",
        route: "/deals/edit/:id",
        component: <InvestorEditDeal />,
      },
      {
        name: "editProfile",
        key: 'edit-profile',
        route: "profile/edit",
        component: <EditProfile />,
      }
    )

  }

  return [routes,
    greenhand]
}
export default MyRoutes;
