import React from 'react';
import renderer from 'react-test-renderer';
import PriceList from './PriceList';
test('PriceList renders correctly', () => {
  const priceList =  {
    info: 'aa',
    price:111
  }
  const tree = renderer.create(<PriceList
    style={null} priceList={priceList}
     />).toJSON();
  expect(tree).toMatchSnapshot();
});