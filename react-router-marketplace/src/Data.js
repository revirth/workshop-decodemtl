let initialItems = [
  {
    name: "boat",
    description: "Nice boats. 50% off. wow.",
    price: 10000,
    image: "/boat.png",
    id: "asewq",
    sellerId: "ewio",
    stock: 10,
    reviews: ["Make sure to mark up an aggregate evalua", "aggregate rating"]
  },
  {
    name: "Lawn chairs",
    id: "wqwasq",
    description: "Lawn chairs",
    price: 50,
    image: "/lawnchair.jpg",
    sellerId: "xcvb",
    stock: 2,
    reviews: [
      "The date that the review was published, in ISO 8601 date format.",
      "The highest value allowed in this rating system. The bestRating property is only required if the rating system is not on a 5-point scale. If bestRating is omitted, 5 is assumed."
    ]
  },
  {
    id: "abc",
    name: "a car",
    description: "THE react hat!!!",
    image:
      "https://cdn.shopify.com/s/files/1/0048/7273/2739/products/1_d59be9ce-7248-470d-9438-e3535282ba5a_1800x1800.JPG?v=1551694849",
    link:
      "https://www.lightailing.com/products/lightailing-lighting-kit-for-lego-bugatti-chiron-technic-42083",
    seller: "https://www.lightailing.com/pages/about-us",
    sellerId: "xcvb",
    price: 500,
    stock: 6,
    reviews: [
      `The item that is being reviewed. This needs to be a valid schema.org type. However, if the review is embedded into another schema.org type using the review property, you can omit the itemReviewed property.`,
      `The rating given in this review. The rating can be a nested Rating or more specific subtype. The most typical subtype is AggregateRating.`
    ]
  },
  {
    id: "def",
    name: "a hat",
    description: "A very nice car!. Only 30000$",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71bVqflH67L._UX679_.jpg",
    link: "https://www.amazon.ca/Unisex-React-baseball-cap-Black/dp/B01N7N262Y",
    seller:
      "https://www.amazon.ca/HJEL-Caps/b/ref=w_bl_sl_ap_ap_web_15929685011?ie=UTF8&node=15929685011&field-lbr_brands_browse-bin=HJEL-Caps",
    sellerId: "xcvb",
    price: 100,
    stock: 9,
    reviews: [
      `You must include the required properties for your structured data to display in search results. You can also include the recommended properties to add more information to your structured data, which could provide a better user experience.`,
      `e full definition of Review is `,
      `The author of the review. The reviewer’s name must be a valid name. For example, "50% off until Saturday" is not a valid name for a reviewer.`
    ]
  },
  {
    id: "ghi",
    name: "lawnmower",
    description:
      "Sun Joe MJ401E Mow Joe 14-Inch 12 Amp Electric Lawn Mower With Grass Bag",
    image:
      "https://m.media-amazon.com/images/I/81eg2RtDKRL._AC_UL480_FMwebp_QL65_.jpg",
    link:
      "https://www.amazon.ca/Sun-Joe-MJ401E-14-Inch-Electric/dp/B0029TLUOA/ref=sr_1_2?keywords=lawn+mower&qid=1556227323&s=gateway&sr=8-2",
    seller:
      "https://www.amazon.ca/Sun-Joe/b/ref=bl_dp_s_web_7898414011?ie=UTF8&node=7898414011&field-lbr_brands_browse-bin=Sun+Joe",
    sellerId: "xcvb",
    price: 5000,
    stock: 1090,
    reviews: [
      `Don't rely on human editors to create, curate, or compil`,
      `Sites must collect ratings information directly from users and not from other sites.`
    ]
  },
  {
    id: "jkl",
    name: "snowshoes",
    description:
      "Pansel Performance Light Weight Snowshoes for Men, Women, Kids 25 inch",
    image:
      "https://m.media-amazon.com/images/I/814vjasnaeL._AC_UL480_FMwebp_QL65_.jpg",
    link:
      "https://www.amazon.ca/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A0211685L4QMWBXUGQW4&url=%2FPansel-Performance-Light-Weight-Snowshoes%2Fdp%2FB0779JGSJG%2Fref%3Dsr_1_1_sspa%3Fkeywords%3Dsnowshoes%26qid%3D1556227569%26s%3Dgateway%26sr%3D8-1-spons%26psc%3D1&qualifier=1556227569&id=4388639034813967&widgetName=sp_atf",
    seller:
      "https://www.amazon.ca/s/ref=bl_dp_s_web_0?ie=UTF8&search-alias=aps&field-keywords=Pansel",
    sellerId: "asdf",
    price: 999,
    stock: 5,
    reviews: ["Ratings must be sourced directly from users."]
  }
];

let initialSellers = [
  {
    id: "ewio",
    name: "Jack Frost",
    rating: "5 stars"
  },
  {
    id: "xcvb",
    name: "Hank Green",
    rating: "2 stars"
  },
  {
    id: "asdf",
    name: "Seller King",
    rating: "3 stars"
  }
];

export { initialItems, initialSellers };
