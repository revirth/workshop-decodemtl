let sellers = [
  {
    name: "bob",
    location: {
      city: "Montreal",
      country: "Canada"
    },
    items: [
      {
        itemid: 0,
        price: 30,
        description: "a very nice hat",
        shipsFrom: {
          city: "Quebec",
          country: "Canada"
        }
      },
      {
        itemid: 1,
        price: 300,
        description: "a fast bicycle",
        shipsFrom: {
          city: "Quebec",
          country: "Canada"
        }
      }
    ]
  },
  {
    name: "sue",
    location: {
      city: "Toronto",
      country: "Canada"
    },
    items: [
      {
        itemid: 5,
        price: 60,
        description: "A warm peacoat",
        shipsFrom: {
          city: "Vancouver",
          country: "Canada"
        }
      },
      {
        price: 30000,
        description: "A nice boat",
        itemid: 1,
        shipsFrom: {
          city: "Seoul",
          country: "Korea"
        }
      }
    ]
  }
]

// location has properties city and country
let elemOfShippingLocation = function(location) {
  return React.createElement(
    "div",
    {},
    "ships from " + location.city + "," + location.country
  )
}
// item has properties price, description, itemid and shipsFrom
let elemOfItem = function(item) {
  return React.createElement(
    "div",
    {},
    React.createElement("h3", {}, item.description),
    "price: " + item.price + " $",
    React.createElement("div", {}, "item id: " + item.itemid),
    elemOfShippingLocation(item.shipsFrom)
  )
}
// location has properties city and country
let elemOfSellerLocation = function(location) {
  return React.createElement(
    "div",
    {},
    "seller location: " + location.city + "," + location.country
  )
}
// seller has properties name, location and items
let elemOfSeller = function(seller) {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "name: " + seller.name),
    elemOfSellerLocation(seller.location),
    seller.items.map(elemOfItem)
  )
}

let sellerElements = sellers.map(elemOfSeller)

ReactDOM.render(sellerElements, document.getElementById("root"))
