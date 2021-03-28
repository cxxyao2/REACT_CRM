import React, { useState } from "react";

function Counter(props) {
  const [coverVisible, setCoverVisible] = useState(true);
  const [qty, setQty] = useState(0);

  return (
    <div onClick={toggleCover}>
      <span>Add to Cart</span>
      <span>
        &#x2212;
        <input type="number" />
        &#43;
      </span>
    </div>
  );
}

export default Counter;
