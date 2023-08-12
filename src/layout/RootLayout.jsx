import { Outlet } from "react-router-dom";
import UserContextProvider from "../Context/UserContext";

const RootLayout = () => {
  return (
         <UserContextProvider>
            <Outlet/>
         </UserContextProvider>
   );
}

export default RootLayout;
