import { Route } from "react-router-dom";
import NavbarContainer from "./containers/common/NavbarContainer";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import client from "./libs/api/_client";
import { getProfile } from "./modules/user";
import AuthProvider from "./context/providers/AuthProvider";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import AddProfilePage from "./pages/EditProfilePage";
import WirtePage from "./pages/WirtePage";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  // const dispatch = useDispatch();
  // const { isLoggedIn } = useSelector(({ user }) => ({
  //   isLoggedIn: user.isLoggedIn,
  // }));
  const { authInfo, setAuthInfo } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null;

    console.log(token);
    async function getAccount() {
      if (token !== null) {
        client.defaults.headers.common["Authorization"] = `${token}`;
        const response = await client.get("/api/auth/profile");
        setAuthInfo({ isLoggedIn: true, userInfo: response.data.data });
        try {
        } catch (error) {
          console.log("ee");
        }
      }
    }
    getAccount();
  }, []);

  return (
    <>
      <GlobalStyles />
      <NavbarContainer />
      <Route component={HomePage} path={["/@:username", "/"]} exact />
      <Route component={SignInPage} exact path="/signin" />
      <Route component={SignUpPage} exact path="/signup" />
      <Route component={EditProfilePage} exact path="/edit/profile" />
      <Route component={WirtePage} exact path="/write" />

      {/* <Route component={RegisterPage} path="/register" /> */}
      {/* <Route component={WritePage} path="/write" /> */}
      {/* <Route component={PostPage} path="/@:username/:postId" /> */}
      <ToastsContainer
        position={ToastsContainerPosition.BOTTOM_CENTER}
        store={ToastsStore}
      />
    </>
  );
}

export default App;
