import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    //console.log(this.videoRef);

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
  }

  buildPlayer() {
    if (
      this.player ||
      !this.props.stream ||
      this.props.currentUserId === this.props.stream.userId
    ) {
      return;
    }

    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    const edit = this.props.currentUserId === this.props.stream.userId;
    return (
      <div>
        {!edit ? <video ref={this.videoRef} style={{ width: '100%' }} controls /> : ''}

        <h1>{title}</h1>
        <h5>{description}</h5>

        {edit ? `Your stream key is: ${this.props.match.params.id}` : ''}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
