// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo7.png";

const date = new Date().getFullYear();

export default {
  brand: {
    
    image: logoCT,
    route: "/",
  },
  socials: [
   
  ],
  menus: [
    {
      name: "Account",
      items: [
        { name: "Sign in", href: "/sign-in" },
        { name: "Sign Up", href: "/sign-up" },
      ]
        
    },
    {
      name: "Find",
      items: [
        { name: "Find Farms", href: "/farms" },
        { name: "Find Investor", href: "/investors" },
        { name: "Find Agent", href: "/presentation" },
      ],
    },
    {
      name: "About",
      items: [
        { name: "Contact Us", href: "https://www.creative-tim.com/contact-us" },
        { name: "About Us", href: "https://www.creative-tim.com/knowledge-center" },
       
      ],
    },
    {
      name: "Farmer Guide",
      items: [
        { name: "Festilizers Guide", href: "/presentation" },
        { name: "Irrigation Guide", href: "/presentation" },
       
      ],
    },
  ]
};
