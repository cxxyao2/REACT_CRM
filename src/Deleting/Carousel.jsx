import React from "react";
import tree1 from "../images/autraliaoil@1x.jpg";

function Carousel(props) {
  const carouselItemClass = (index) => {
    return index === 0 ? "carousel-item active" : "carousel-item";
  };
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {["First", "Second", "Third"].map((member, index) => (
          <>
            <div
              className={carouselItemClass(index)}
              key={member.concat(index)}
            >
              <img
                src={tree1}
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
          </>
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
  );
}

export default Carousel;
