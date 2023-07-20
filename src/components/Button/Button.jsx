import { PropTypes } from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onClick, txt }) => {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {txt}
    </button>
  );
};

Button.propTypes = {
  txt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
