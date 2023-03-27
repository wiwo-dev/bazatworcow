//import "./styles.css";
import PropTypes from "prop-types";

interface Props {
  name: string;
}

const Greeting = ({ name }: Props) => {
  return <h2>Hello, {name}</h2>;
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
