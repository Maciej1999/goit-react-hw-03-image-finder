import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  static defaultProps = {
    id: 'no id',
    miniature: 'no miniature',
    url: 'no url',
    alt: 'no alt',
  };

  render() {
    return (
      <li
        className={css.galleryItem}
        id={this.props.id}
        onClick={this.props.onClick}
      >
        <img
          src={this.props.miniature}
          className={css.galleryItemImage}
          alt={this.props.alt}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  miniature: PropTypes.string,
  alt: PropTypes.string,
};
