import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  static defaultProps = {
    url: 'no url',
    alt: 'no alt',
  };
  handleKeyUp = e => {
    if (e.key === 'Escape') this.props.stateUpdate('modalIndex', '-1');
  };
  closeModal = e => {
    if (e.target.className === css.Overlay)
      this.props.stateUpdate('modalIndex', '-1');
  };

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.closeModal}>
        <div className={css.Modal}>
          <img className={css.img} src={this.props.url} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
};
