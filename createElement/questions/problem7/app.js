var elem = (
  <div style={{ width: "100%", display: "flex" }}>
    {touristAttractions.map((attraction, i) => {
      return (
        <div style={{ border: "1px solid red", width: "500px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>{attraction.name}</h1>
            <label
              style={{
                marginLeft: "10px",
                marginTop: "auto",
                marginBottom: "auto"
              }}
            >
              {attraction.location.city}
            </label>
            <img
              src={`http://www.senojflags.com/images/national-flag-symbols/${
                attraction.location.country === "USA"
                  ? "United-States-of-America"
                  : attraction.location.country
              }-Flag.png`}
              style={{
                marginLeft: "5px",
                marginTop: "auto",
                marginBottom: "auto"
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundImage: `url(${attraction.picture})`,
              backgroundSize: "cover"
            }}
          >
            <h2 className="gradient">
              &nbsp;visitorsPerYear :{" "}
              {attraction.visitorsPerYear.toLocaleString()}
            </h2>
            <h2 className="gradient">
              &nbsp;entrancePrice : {attraction.entrancePrice}$
            </h2>
          </div>
        </div>
      );
    })}
  </div>
);

ReactDOM.render(elem, document.getElementById("root"));
