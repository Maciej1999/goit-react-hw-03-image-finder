import { Component } from 'react';
import { PropTypes } from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' || this.props.query };
  }
  inputHandle = e => {
    this.setState({ search: e.target.value });
    // this.props.stateUpdate(e.target.name, e.target.value);
  };
  submitHandle = e => {
    e.preventDefault();
    this.props.stateUpdate('query', this.state.search);
    this.props.searchHandle();
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitHandle}>
          <button type="submit" className={css.button}>
            <span className={css.label}>🔍</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            value={this.state.search}
            onInput={this.inputHandle}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  query: PropTypes.string,
  stateUpdate: PropTypes.func.isRequired,
  searchHandle: PropTypes.func.isRequired,
};
