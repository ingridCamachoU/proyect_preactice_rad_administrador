import {createBrowserRouter} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateLayout from '../layout/PrivateLayout';
import IndexProd from '../Pages/ProductData/IndexProd';
import IndexOthers from '../Pages/Others/IndexOthers';
import IndexProv from '../Pages/ProvidersData/IndexProv';
import IndexUser from '../Pages/UserData/IndexUser';

export const router = createBrowserRouter ([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path:"content",
                element: <PrivateLayout/>,
                children:[
                    {
                        index: true,
                        element: <IndexProd/>,
                    },
                    {
                        path: "others",
                        element: <IndexOthers/>,
                    },
                    {
                        path: "provider",
                        element: <IndexProv/>,
                    },
                    {
                        path: "user",
                        element: <IndexUser/>,
                    }
                ]
            }
        ] 
    }
]);