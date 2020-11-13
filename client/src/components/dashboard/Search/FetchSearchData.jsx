import React from "react";

export default class FetchSearchData extends React.Component {
  state = {
    loading: true,
    res: null,
  };

  async componentDidMount() {
    const url = `/api/spotify/search/${this.props.term}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ res: data.shows.items[0], loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>Waiting for results...</div>;
    }
    if (!this.state.res) {
      return <div>No results</div>;
    }

    return (
      <div>
        <div>{this.state.res.name}</div>
        <div>{this.state.res.publisher}</div>
        <div>{this.state.res.total_episodes}</div>
        <img src={this.state.res.images[2].url} />
      </div>
    );
  }
}
