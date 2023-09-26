import { Star, StarHalf, StarFill } from "react-bootstrap-icons";

export default function Rating({ rating }) {
  const maxRating = 5;
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating.rate) {
        stars.push(<StarFill key={i} color="#672934" size="18" />);
      } else if (i - rating.rate <= 0.5) {
        stars.push(<StarHalf key={i} color="#672934" size="18" />);
      } else {
        stars.push(<Star key={i} color="#672934" size="18" />);
      }
    }
    return stars;
  };

  return (
    <>
      <span className="rating-text">{rating.rate}&nbsp;</span>
      {renderStars()}
      <span className="rating-text"> &nbsp;{rating.count} ratings</span>
    </>
  );
}
