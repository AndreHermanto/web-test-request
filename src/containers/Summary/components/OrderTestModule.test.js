import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import OrderTestModule from './OrderTestModule';

function getStep(value) {
  return value;
}
describe('OrderTestModule test', () => {
  const testData = {
    test: {
    id:'7052d137-a166-48b0-a52e-e05a167bd176',
    label: 'Consequatur adipisci modi laudantium tenetur ea exercitationem id',
    genes:["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
    },
    genes:["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
  }
  const props = {
    orderTestModule: testData,
    handleOnClick: getStep
  };
    
  test('renders without crashing ', () => {
    const page = renderer.create(React.createElement(OrderTestModule, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <OrderTestModule orderTestModule={testData} handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step1')).toEqual('step1');
    expect(page.handleOnClick()).toEqual(1);
  });
});
