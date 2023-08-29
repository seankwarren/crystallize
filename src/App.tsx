import './App.css';
import Modal from './components/generic/Modal';
import Content from './components/layout/Content';
import Header from './components/layout/Header';
import NavigationBar from './components/layout/NavigationBar';

const App = () => {
    return (
        <div id="app-wrapper">
            <Modal></Modal>
            <Header></Header>
            <NavigationBar></NavigationBar>
            <Content></Content>
        </div>
    )
}

export default App;
