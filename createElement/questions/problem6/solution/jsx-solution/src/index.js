import React from "react"
import ReactDOM from "react-dom"

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
  return <div>{"ships from " + location.city + "," + location.country}</div>
}
// item has properties price, description, itemid and shipsFrom
let elemOfItem = function(item) {
  return (
    <div>
      <h3> {item.description}</h3>
      {"price: " + item.price + " $"}
      <div> {"item id: " + item.itemid} </div>
      {elemOfShippingLocation(item.shipsFrom)}
    </div>
  )
}
// location has properties city and country
let elemOfSellerLocation = function(location) {
  return (
    <div>{"seller location: " + location.city + "," + location.country} </div>
  )
}
// seller has properties name, location and items
let elemOfSeller = function(seller) {
  return (
    <div>
      <h1>{"name: " + seller.name}</h1>
      {elemOfSellerLocation(seller.location)}
      {seller.items.map(elemOfItem)}
    </div>
  )
}

let sellerElements = sellers.map(elemOfSeller)

ReactDOM.render(sellerElements, document.getElementById("root"))
