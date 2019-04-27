let flags = country =>
  "http://www.senojflags.com/images/national-flag-icons/" +
  (country === "Korea" ? "South-Korea" : country) +
  "-Flag.png";



let sellerItems = item => (
  <li style={{ listStyle: "none" }}>
    <div style={{ float: "left" }}>
      {`id: ${item.itemid}
              | price: ${item.price}
              | desc: ${item.description}
              | city: ${item.shipsFrom.city}`}
    </div>
    <div>
      <img
        style={{ marginLeft: "3px", marginTop: "2px" }}
        src={flags(item.shipsFrom.country)}
      />
    </div>
  </li>
);

let sellers = seller => 
  <div>
    <h1>{`${seller.name}'s items`}</h1>
  </div>
  <hr />
  <ul>
    {seller.items.map(item => sellerItems(item))}
  </ul>

let elem = (
  <div>
    {sellers.map((seller, i) => sellers(seller)}
  </div>
);

ReactDOM.render(elem, document.getElementById("root"));
