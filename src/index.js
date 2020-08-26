import React from 'react';
import ReactDOM from 'react-dom';
import ModalArea from './ModalArea';
import './index.css';
import './bootstrap/dist/css/bootstrap.min.css'

const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class HeaderArea extends React.Component {
  render() {
    const title = getTitleName();
    return (
      <div>
        {title}
        <button className="btn btn-primary">追加</button>
        <button className="btn btn-primary">Cond値</button>
        <button className="btn btn-primary">パラメータ保存</button>
      </div>
    );
  }
}

function getTitleName() {
  const title = 'ステータスチェッカー';
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
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

class StatusList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};

    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
  }

  showDetail(i) {
    this.setState({showModal: true});
  }

  hideDetail(i) {
    this.setState({showModal: false});
  }

  render() {

    const modal = this.state.showModal ? (
      <Modal>
        <div className="childModal">
          <ModalArea />
          <button class="btn btn-default" data-dismiss="modal" onClick={this.hideDetail}><span aria-hidden="true">&times;</span></button>
        </div>
      </Modal>
    ) : null;

    return (
      <div>
        <header className="HeaderArea"><HeaderArea /></header>
        <div className="listArea">
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
        </div>
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