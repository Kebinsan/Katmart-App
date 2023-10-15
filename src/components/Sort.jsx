import Form from "react-bootstrap/Form";
/**
 * I know reusing similar code over and over is bad design
 * however I was unable to figure out a way to do this without
 * repeating over and over.
 * Tried using event.target.name but doesn't seem to work with
 * switch options and a couple other methods
 */

export default function Sort({ products, setProducts, reRender, setReRender }) {
  const onChangeHandler = (event) => {
    switch (event.target.value) {
      case "0":
        setProducts(
          products.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "1":
        setProducts(
          products.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "2":
        setProducts(
          products.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (a.price < b.price) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "3":
        setProducts(
          products.sort((a, b) => {
            if (a.rating.rate > b.rating.rate) {
              return -1;
            }
            if (a.rating.rate < b.rating.rate) {
              return 1;
            }
            return 0;
          })
        );
        break;
      default:
        break;
    }
    setReRender(true);
  };

  return (
    <Form.Select
      className="sort-form"
      aria-label="sort-by"
      size="sm"
      onChange={(event) => {
        onChangeHandler(event);
      }}
    >
      <option default>Sort By...</option>
      <option value="0">A-Z</option>
      <option value="1">Lowest Price</option>
      <option value="2">Highest Price</option>
      <option value="3">Highest Rating</option>
    </Form.Select>
  );
}
