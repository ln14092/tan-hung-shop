import Home from "../pages/home/Home";
import UserList from "../pages/userList/UserList";
import User from "../pages/user/User";
import NewUser from "../pages/newUser/NewUser";
import ProductList from "../pages/productList/ProductList";
import Product from "../pages/product/Product";
import NewProduct from "../pages/newProduct/NewProduct";
import Login from "../pages/login/Login";

const privateRoutes = [
  { path: "/", component: Home },
  { path: "/users", component: UserList },
  { path: "/user/:userId", component: User },
  { path: "/newUser", component: NewUser },
  { path: "/products", component: ProductList },
  { path: "/product/:productId", component: Product },
  { path: "/newproduct", component: NewProduct },
];

const publicRoutes = [{ path: "login", component: Login, layout: null }];
export { publicRoutes, privateRoutes };
