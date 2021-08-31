import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import routes from "../constants/routes.json";
import ProductDetail from "./ProductDetails";
import Admin from "../pages/Admin";

const Main = () => {
  return (
    <MainWrapper>
      <Switch>
        <Route exact path={routes.HOME} component={Home} />
        <Route exact path={routes.PRODUCTS} component={Products} />
        <Route exact path={routes.PRODUCT} component={ProductDetail} />
        <Route exact path={routes.CONTACT} component={Contact} />
        <Route exact path={routes.ADMIN} component={Admin} />
      </Switch>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: ${({ theme }) => theme.widths.content};
  margin: 0 auto;
  padding: 10px;
`;

export default Main;
