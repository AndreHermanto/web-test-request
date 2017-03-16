import React from 'react';
import ReactDOM from 'react-dom';
import LoginInvoice from './index';
import renderer from 'react-test-renderer';

describe('Create new ontology page', () => {
  it('LoginInvoice', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginInvoice />, div);
  });

  it('LoginInvoice renders correctly', function() {
    const tree = renderer.create(<LoginInvoice />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});