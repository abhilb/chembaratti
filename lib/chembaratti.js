'use babel';

import ChembarattiView from './chembaratti-view';
import { CompositeDisposable } from 'atom';

export default {

  chembarattiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.chembarattiView = new ChembarattiView(state.chembarattiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.chembarattiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chembaratti:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.chembarattiView.destroy();
  },

  serialize() {
    return {
      chembarattiViewState: this.chembarattiView.serialize()
    };
  },

  toggle() {
    console.log('Chembaratti was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
