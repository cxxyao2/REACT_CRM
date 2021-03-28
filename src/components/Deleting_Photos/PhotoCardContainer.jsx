import React, { PureComponent } from "react";
import PhotoCard from "./PhotoCard";

class PhotoCardContainer extends PureComponent {
  state = {
    cards: [
      { display: true },
      { display: true },
      { display: true },
      { display: true },
      { display: true },
      { display: true },
      { display: true },
    ],
  };

  handleCloseCard = (index) => {
    const cards = [...this.state.cards];
    cards[index].display = false;
    this.setState({ cards: [...cards] });
  };

  render() {
    return (
      <div className="container bg-white rounded  overflow-hidden">
        <div className="row bg-white justify-content-between">
          {this.state.cards &&
            this.state.cards.map(
              (card, index) =>
                card.display && (
                  <PhotoCard
                    key={index}
                    myIndex={index}
                    onClose={() => this.handleCloseCard(index)}
                  />
                )
            )}
        </div>
      </div>
    );
  }
}

export default PhotoCardContainer;
