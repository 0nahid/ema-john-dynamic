const ReviewItem = (props) => {
  const { name, price, quantity, key, img } = props.product;
  const { handleRemove } = props;
  return (
    <div className="product">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <img src={img} alt="" />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <h4 className="product-name">{name}</h4>
          <p>Price: {price}</p>
          <p>Quantity: {quantity}</p>
          <div>
            <button onClick={() => handleRemove(key)} className="btn-regular">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
