import React from "react";
import cardImage from "../images/fork_1x.jpg";

function Homepage(props) {
  const carouselItemClass = (index) => {
    return index === 0 ? "carousel-item active" : "carousel-item";
  };

  const getImageFile = (index) => {
    let image = require(`../images/series${index}.jpg`);
    return image.default;
  };

  return (
    <>
      <div className="container">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {["First", "Second", "Third"].map((member, index) => (
              <div
                className={carouselItemClass(index)}
                key={member.concat(index)}
              >
                <img
                  src={getImageFile(index + 1)}
                  className="d-block w-100"
                  alt="..."
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{member} slide label</h5>
                  <p>
                    Some representative placeholder content for the {member}{" "}
                    slide.
                  </p>
                </div>
              </div>
            ))}

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="row clearfix">
          {[1, 2, 3].map((value, index) => (
            <div className="col-md-4 col-12 mt-2 " key={index}>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Card title</h5>
                  <img
                    src={cardImage}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                    alt="..."
                  />
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
