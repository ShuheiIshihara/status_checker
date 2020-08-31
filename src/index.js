import React from 'react';
import ReactDOM from 'react-dom';
import ModalArea from './ModalArea';
import './index.css';
import './bootstrap/dist/css/bootstrap.min.css'

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class ItemList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}

    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);

  }

  showDetail(videoId) {
    this.setState({showModal: true, videoId: videoId});
    console.log(this.state);
  }

  hideDetail() {
    this.setState({showModal: false, videoId: ""});
    console.log(this.state);
  }

  render() {

    var i = 0

    console.log("hello: " + this.state.showModal);
    const modal = this.state.showModal ? (
      <Modal>
        <div className="childModal">
          <ModalArea />
          <button className="btn btn-default" data-dismiss="modal" onClick={this.hideDetail}><span aria-hidden="true">&times;</span></button>
        </div>
      </Modal>
    ) : null;
    console.log(modal);

    return (
      <div className="table-row">
        {this.props.items.map((item) => (
          <div key={i++}>
            <div className="table-cell">{i}</div>
            <div className="table-cell">{item.snippet.title}</div>
            <div className="table-cell">{item.snippet.channelTitle}</div>
            <div className="table-cell">{item.snippet.publishTime}</div>
            <div className="table-cell"><button className="btn btn-info" onClick={() => this.showDetail(item.id.videoId)}>再生</button></div>
          </div>
        ))}
        {modal}
      </div>
    )
  }
}

class HeaderArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', jsonData: require("./data/common.json")};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  searchVideo() {

    if(this.state.value !== "" && this.state.jsonData !== null) {
      fetch("https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=" + this.state.jsonData.api_key + "&q=" + this.state.value)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
            this.generateResultList();
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  generateResultList() {

    if(this.state.items.length <= 0) {
      console.log("取得結果0件");
      return;
    }
    ReactDOM.render(<ItemList items={this.state.items} />, document.getElementById('listArea'));
  }

  render() {
    const title = getTitleName();
    return (
      <div>
        {title}
        <input type="text" className="form-control" placeholder="検索ワード" value={this.state.value} onChange={this.handleChange}></input>
        <button className="btn btn-primary" onClick={() => this.searchVideo()}>検索</button>
      </div>
    );
  }
}

function getTitleName() {
  var title = "";
  if (this.state.jsonData !== null) {
    title = this.state.jsonData.title;
  }
  return title;
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    console.log("Modal");
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class StatusList extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {}

    // this.showDetail = this.showDetail.bind(this);
    // this.hideDetail = this.hideDetail.bind(this);
  }

  // showDetail(videoId) {
  //   this.setState({showModal: true, videoId: videoId});
  //   this.state.videoId = videoId;
  //   this.state.showModal = true;
  //   // console.log(this.state.videoId);
  //   // console.log(this.state.showModal);
  //   console.log(this.state);
  // }

  // hideDetail() {
  //   this.setState({showModal: false, videoId: ""});
  //   // this.state.videoId = "";
  //   // this.state.showModal = false;
  // }

  render() {

    // const modal = this.state.showModal ? (
    //   <Modal>
    //     <div className="childModal">
    //       <ModalArea />
    //       <button className="btn btn-default" data-dismiss="modal" onClick={this.hideDetail}><span aria-hidden="true">&times;</span></button>
    //     </div>
    //   </Modal>
    // ) : null;
    // console.log(modal);

    return (
      <div>
        <header className="HeaderArea"><HeaderArea /></header>
        {/* <div id="listArea">
          <div className="table-row">
            <div className="table-cell"></div>
            <div className="table-cell">item1</div>
            <div className="table-cell">item2</div>
            <div className="table-cell">item3</div>
            <div className="table-cell">詳細</div>
          </div>
          <div className="table-row">
            <div className="table-cell">1</div>
            <div className="table-cell">data1-1</div>
            <div className="table-cell">data1-2</div>
            <div className="table-cell">data1-3</div>
            <div className="table-cell"><button className="btn btn-info" onClick={() => this.showDetail(1)}>詳細</button></div>
          </div>
          <div className="table-row">
            <div className="table-cell">2</div>
            <div className="table-cell">data2-1</div>
            <div className="table-cell">data2-2</div>
            <div className="table-cell">data2-3</div>
            <div className="table-cell"><button className="btn btn-info" onClick={() => this.showDetail(2)}>詳細</button></div>
          </div>
          {modal}
        </div> */}
        <div id="listArea"></div>
        <footer className="FooterArea"><FooterArea /></footer>
      </div>
    )
  }
}

class FooterArea extends React.Component {
  // 何もしない
  render() {return (<div>フッター部</div>);}
}

// ========================================

ReactDOM.render(<StatusList />, appRoot);