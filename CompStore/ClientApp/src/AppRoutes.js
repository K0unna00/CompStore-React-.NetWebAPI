import Home from "./components/Home";
import Hero from "./components/Hero";
import Login from "./components/LoginRegister/Login";
import CreateProduct from "./components/CreateProduct";
import DeleteProduct from "./components/DeletePage/Delete";
import Register from "./components/LoginRegister/Register";
import AllProducts from "./components/AllProducts";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import AboutUs from "./components/AboutUs/AboutUs";
import ContactUs from "./components/ContactUs/ContactUs";
import AccountEditPage from "./components/AccountEditPage/AccountEditPage";
import AccountPage from "./components/AccountPage/AccountPage";
import CheckOutPage from "./components/CheckOutPage/CheckOutPage";
import DeliveryPage from "./components/DeliveryPage/DeliveryPage";
import ProductReview from "./components/ProductReview/ProductReview";
import ReviewPage from "./components/ReviewPage/ReviewPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
    {
        path: '/hero',
        requireAuth: false,
        element: <Hero />
    },
    {
        path: '/products',
        requireAuth: false,
        element: <AllProducts />
    },
    {
        path: '/products/:productId',
        requireAuth: false,
        element: <ProductDetail />
    },
    {
        path: '/login',
        requireAuth: false,
        element: <Login />
    },
    {
        path: '/register',
        requireAuth: false,
        element: <Register />
    },
    {
        path: '/createProduct',
        requireAuth: false,
        element: <CreateProduct />
    },
    {
        path: '/deleteProduct',
        requireAuth: false,
        element: <DeleteProduct />
    },
    {
        path: '/userAccountEdit',
        requireAuth: false,
        element: <AccountEditPage />
    },
    {
        path: '/userAccount',
        requireAuth: false,
        element: <AccountPage />
    },
    {
        path: '/cart',
        requireAuth: false,
        element: <Cart />
    },
    {
        path: '/aboutUs',
        requireAuth: false,
        element: <AboutUs />
    },
    {
        path: '/contactUs',
        requireAuth: false,
        element: <ContactUs />
    },
    {
        path: '/checkOutPage',
        requireAuth: false,
        element: <CheckOutPage />
    },
    {
        path: '/deliveryPage',
        requireAuth: false,
        element: <DeliveryPage />
    },
    {
        path: '/productReview',
        requireAuth: false,
        element: <ProductReview />
    },
    {
        path: '/productReview/:productId',
        requireAuth: false,
        element: <ReviewPage />
    },
];

export default AppRoutes;
