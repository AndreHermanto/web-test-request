import React from 'react';
import DatePicker from './DatePicker';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';

describe('DatePicker', function() {
  /*test('renders correctly', function() {
    const component = renderer.create(<DatePicker  name="dob" onChange={(a)=>{send = a.target.value;}} />).toJSON();
    expect(component).toMatchSnapshot();
  });*/
  
  test('onSelectionChange updates and parse the value to parent\'s date state correctly', async function() {
    var send;
    const component = TestUtils.renderIntoDocument(
      <DatePicker 
        name="dob" 
        onChange={(a)=>{send = a.target.value;}}
        formState={{}}
      />
    );
    component.state = {}; 
    component.handleSelectionChange([{ name: 'year', value: '1999' }]);
    expect(send).toEqual('');
    component.handleSelectionChange([{ name: 'month', value: 'June' }]);
    expect(send).toEqual('');
    component.handleSelectionChange([{ name: 'day', value: '21' }]);
    expect(send).toEqual('21-June-1999');
  });
});