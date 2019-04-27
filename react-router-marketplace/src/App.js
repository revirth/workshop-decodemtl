import React from "react";
import logo from "./logo.svg";
import Item from "./Item";
import ItemDetail from "./ItemDetail";
import ItemReview from "./ItemReview";
import Seller from "./Seller";
import "./App.css";
import { initialItems, initialSellers } from "./Data";
import { BrowserRouter, Route } from "react-router-dom";

let renderAllItems = () => {
  return (
    <div>
      <a href="/sellers/">All our sellers</a>
      {initialItems.map(item => (
        <Item item={item} />
      ))}
    </div>
  );
};

let renderItem = rd => {
  let item = initialItems.filter(item => item.id === rd.match.params.iid)[0];
  return <ItemDetail item={item} />;
};

let renderItemReviews = rd => {
  let item = initialItems.filter(item => item.id === rd.match.params.iid)[0];
  return <ItemReview item={item} />;
};

let renderAllSellers = () => {
  return initialSellers
    .sort((a, b) => (a.rating > b.rating ? -1 : 1))
    .map(seller => <Seller seller={seller} showUploadForm={false} />);
};

let renderSeller = routerData => {
  let sid = routerData.match.params.sid;
  let seller = initialSellers.filter(s => s.id === sid)[0];

  return <Seller seller={seller} showUploadForm={true} />;
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact={true} path="/" render={renderAllItems} />
        <Route exact={true} path="/sellers" render={renderAllSellers} />
        <Route exact={true} path="/sellers/:sid" render={renderSeller} />
        <Route exact={true} path="/items/:iid" render={renderItem} />
        <Route
          exact={true}
          path="/items/:iid/reviews"
          render={renderItemReviews}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
