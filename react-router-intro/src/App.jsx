import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

let items = [
  {
    id: "abc",
    name: "a car",
    desc: "THE react hat!!!",
    img:
      "https://cdn.shopify.com/s/files/1/0048/7273/2739/products/1_d59be9ce-7248-470d-9438-e3535282ba5a_1800x1800.JPG?v=1551694849",
    link:
      "https://www.lightailing.com/products/lightailing-lighting-kit-for-lego-bugatti-chiron-technic-42083",
    seller: "https://www.lightailing.com/pages/about-us"
  },
  {
    id: "def",
    name: "a hat",
    desc: "A very nice car!. Only 30000$",
    img:
      "https://images-na.ssl-images-amazon.com/images/I/71bVqflH67L._UX679_.jpg",
    link: "https://www.amazon.ca/Unisex-React-baseball-cap-Black/dp/B01N7N262Y",
    seller:
      "https://www.amazon.ca/HJEL-Caps/b/ref=w_bl_sl_ap_ap_web_15929685011?ie=UTF8&node=15929685011&field-lbr_brands_browse-bin=HJEL-Caps"
  },
  {
    id: "ghi",
    name: "lawnmower",
    desc:
      "Sun Joe MJ401E Mow Joe 14-Inch 12 Amp Electric Lawn Mower With Grass Bag",
    img:
      "https://m.media-amazon.com/images/I/81eg2RtDKRL._AC_UL480_FMwebp_QL65_.jpg",
    link:
      "https://www.amazon.ca/Sun-Joe-MJ401E-14-Inch-Electric/dp/B0029TLUOA/ref=sr_1_2?keywords=lawn+mower&qid=1556227323&s=gateway&sr=8-2",
    seller:
      "https://www.amazon.ca/Sun-Joe/b/ref=bl_dp_s_web_7898414011?ie=UTF8&node=7898414011&field-lbr_brands_browse-bin=Sun+Joe"
  },
  {
    id: "jkl",
    name: "snowshoes",
    desc:
      "Pansel Performance Light Weight Snowshoes for Men, Women, Kids 25 inch",
    img:
      "https://m.media-amazon.com/images/I/814vjasnaeL._AC_UL480_FMwebp_QL65_.jpg",
    link:
      "https://www.amazon.ca/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A0211685L4QMWBXUGQW4&url=%2FPansel-Performance-Light-Weight-Snowshoes%2Fdp%2FB0779JGSJG%2Fref%3Dsr_1_1_sspa%3Fkeywords%3Dsnowshoes%26qid%3D1556227569%26s%3Dgateway%26sr%3D8-1-spons%26psc%3D1&qualifier=1556227569&id=4388639034813967&widgetName=sp_atf",
    seller:
      "https://www.amazon.ca/s/ref=bl_dp_s_web_0?ie=UTF8&search-alias=aps&field-keywords=Pansel"
  }
];

let renderRoot = () => {
  return (
    <div>
      Welcome to this page. Click here to view all items:{" "}
      <Link to="/allItems">All Items</Link>
    </div>
  );
};

let renderAllItems = () => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <Link to={`/item/${item.id}`}>
            {item.name}
            <br />
            <img style={{ width: "100px" }} src={item.img} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

let renderItem = routerData => {
  let item = items.filter(
    item => item.id === routerData.match.params.itemId
  )[0];

  return item ? (
    <div>
      {item.desc}
      <br />
      <img alt={item.desc} style={{ width: "200px" }} src={item.img} />
      <br />
      <a href={item.link} target="_blank">
        Product Link
      </a>
      <br />
      <a href={item.seller} target="_blank">
        Seller
      </a>
    </div>
  ) : (
    <div>Unknown item</div>
  );
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact={true} path="/" render={renderRoot} />
        <Route exact={true} path="/allItems" render={renderAllItems} />
        <Route exact={true} path="/item/:itemId" render={renderItem} />
      </BrowserRouter>
    </div>
  );
}

export default App;
