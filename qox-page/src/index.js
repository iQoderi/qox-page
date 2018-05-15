import {createElement, Component, render} from 'rax';
import View from 'rax-view';
import Recyclerview from 'rax-recyclerview';
import styles from './style.css';

const Header = Recyclerview.Header;
const Cell = Recyclerview.Cell;

const allowTypes = ['header', 'cell', 'top', 'bottom'];

class App extends Component {
  
  renderRecycleviewItem() {    
    const { modules } = this.props;
    const renderModules = [];
    
    if (Array.isArray(modules)) {
      modules.forEach((module, index) => {
        const { moduleName } = module;
        const Module = window.require(moduleName);

        let renderType = 'cell';

        if (typeof Module.renderType === 'function') {
          let _renderType = Module.renderType();

          if (allowTypes.indexOf(_renderType) > -1) {
            renderType = _renderType;
          }
        }
        
        if (renderType === 'header') {
          return renderModules.unshift((
            <Header>
              <Module/>
            </Header>
          ));
        }

        if (renderType === 'cell') {
          return renderModules.push((
            <Cell>
              <Module/>
            </Cell>
          ));
        }
      });
    }

    return renderModules;
  }

  render() {
    return (
      <View style={styles.container}>
        <Recyclerview
          ref={(scrollView) => {
            this.scrollView = scrollView
          }}
          onEndReached={() => {
            console.log('end reached!');
          }}
        >
        {this.renderRecycleviewItem()}
        </Recyclerview>
      </View>
    );
  }
}

export default App;
