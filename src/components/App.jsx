import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchData } from 'services/api';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      gallery: [],
      hits: 0,
      modalIndex: '-1',
      loading: false,
      loadingMore: false,
      query: 'Pokemon',
      page: 0,
      scroll: 0,
    };
  }
  clearGallery = () => {
    this.setState({ error: '', page: 0, hits: 0, gallery: [] });
  };
  stateUpdate = (key, value) => {
    this.setState({ [key]: value });
  };
  convertResponseIntoGallery = response => {
    if (!response.data.hits) return [];
    return response.data.hits.map(hit => ({
      id: hit.id,
      miniature: hit.webformatURL,
      url: hit.largeImageURL,
      tags: hit.tags,
    }));
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      try {
        this.fetchGallery();
      } finally {
        if (this.state.page > 1) {
          window.scrollTo(0, this.state.scroll);
        }
      }
    }
  }
  saveScrollPosition = () => {
    const y = Math.floor(
      document.documentElement.scrollTop || document.body.scrollTop
    );
    this.setState({ scroll: y });
  };

  async componentDidMount() {
    await this.newGallery();
  }

  componentDidCatch(error) {
    console.log(error);
    this.setState({ error: error, loading: false });
  }
  async fetchGallery() {
    const response = await fetchData(
      this.state.query,
      this.state.page,
      this.componentDidCatch.bind(this)
    );
    this.setState(prev => {
      return {
        response: response,
        loadingMore: false,
        loading: false,
        gallery: [
          ...prev.gallery,
          ...this.convertResponseIntoGallery(response),
        ],
        hits: Number(response.data.totalHits),
      };
    });
    return true;
  }
  async newGallery() {
    this.clearGallery();
    try {
      await this.setState(prev => {
        return { loading: true, page: 1 };
      });
    } finally {
      return true;
    }
  }
  async loadMoreGallery() {
    this.saveScrollPosition();
    await this.setState(prev => {
      return { loadingMore: true, page: 1 + Number(prev.page) };
    });
    return true;
  }

  render() {
    return (
      <div className="App">
        {this.state.loading ? <Loader /> : ''}
        <Searchbar
          query={this.state.query}
          stateUpdate={this.stateUpdate.bind(this)}
          searchHandle={this.newGallery.bind(this)}
        />
        {Number(this.state.modalIndex) > -1 ? (
          <Modal
            {...this.state.gallery[this.state.modalIndex]}
            stateUpdate={this.stateUpdate.bind(this)}
          />
        ) : (
          ''
        )}
        {!this.state.loading && this.state.gallery.length > 0 ? (
          <ImageGallery
            gallery={this.state.gallery}
            stateUpdate={this.stateUpdate.bind(this)}
          />
        ) : this.state.error ? (
          ''
        ) : (
          <span className="Message">No search results.</span>
        )}
        {this.state.error ? (
          <span className="Message">{this.state.error.message}</span>
        ) : (
          ''
        )}
        {this.state.hits > Math.max(0, this.state.gallery.length) ? (
          this.state.loadingMore ? (
            <Loader small={true} />
          ) : (
            <Button txt="Load more" onClick={this.loadMoreGallery.bind(this)} />
          )
        ) : (
          ''
        )}
      </div>
    );
  }
}
