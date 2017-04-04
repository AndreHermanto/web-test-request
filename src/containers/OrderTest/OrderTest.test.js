import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import OrderTest from './index';

describe('OrderTest: index', () => {
  var panelTypes = { data:[
    {
      id:'cat1',
      categories:[
        {
          id:'panels1',
          panels:[{ id: 'p1', label: 'p1' }, { id: 'p2', label: 'p2' }]
        },
        {
          id:'panels2',
          panels:[{ id: 'p3', label: 'p3' }, { id: 'p4', label: 'p4' }]
        }
      ] 
    },
    {
      id:'cat2',
      categories:[
        {
          id:'panels3',
          panels:[{ id: 'p5', label: 'p5' }, { id: 'p6', label: 'p6' }]
        },
        {
          id:'panels4',
          panels:[{ id: 'p7', label: 'p7' }, { id: 'p8', label: 'p8' }]
        }
      ] 
    },
    {
      id:'special',
      label:'Whole Genome Analysis',
      categories:[
        {
          id:'specialPanels',
          panels:[{ id: 'whole' }]
        }
      ] 
    }
  ]};
  
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step1']
  };
  
  var prefilledProps = {
    route: {
      onChange: jest.fn(),
      data: { test: panelTypes.data[1].categories[1].panels[1] }
    },
    router:['/step1']
  };
  
  test('renders without crashing - initial state with empty geneList', () => {
    const page = renderer.create(React.createElement(OrderTest, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('componentWillMount runs the function getting the panels categories and data', async () => {
    const page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    FetchMock.get('*', panelTypes);
    await page.componentWillMount();
    expect(page.state.panelCategories[1].id).toEqual('cat2');
    FetchMock.restore();                           
  });
  
  test('componentWillMount will also preselect the category if prefill-data exist', async () => {
    const page = TestUtils.renderIntoDocument(React.createElement(OrderTest, prefilledProps));
    FetchMock.get('*', panelTypes);
    await page.componentWillMount();
    expect(page.state.chosenPanelMainCategory.id).toEqual('cat2');
    expect(page.state.chosenPanelSubCategory.id).toEqual('panels4');
    expect(page.state.form.test.id).toEqual('p8');
    FetchMock.restore();             
  });
  
  test('handleTestSelect works - select a test panel', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.panelCategories = panelTypes.data;
    page.handleMainCategoryChange(panelTypes.data[1]);
    page.handleSubCategoryChange(page.state.chosenPanelMainCategory.categories[1]);
    const selection = page.state.chosenPanelSubCategory.panels[0];
    page.handleTestSelect(selection);
    expect(page.state.form.test.id).toEqual('p7');  
  });
  
  test('handleMainCategoryChange, when select Whole Genome Analysis, which is a special case, it auto selects the panel', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.panelCategories = panelTypes.data;
    page.handleMainCategoryChange(panelTypes.data[2]);
    expect(page.state.form.test.id).toEqual('whole');  
  })
  
  test('handleConfirm works without selection', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));                                         
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/step1')
  });
  
  test('handleConfirm works after selection', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.panelCategories = panelTypes.data;
    page.handleMainCategoryChange(panelTypes.data[1]);
    page.handleSubCategoryChange(page.state.chosenPanelMainCategory.categories[1]);
    const selection = page.state.chosenPanelSubCategory.panels[0];
    page.handleTestSelect(selection);
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/step2')
  });
  
  test('handleConfirm works after selection in edit mode', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.panelCategories = panelTypes.data;
    page.props.route.isEdited = true;
    page.handleMainCategoryChange(panelTypes.data[1]);
    page.handleSubCategoryChange(page.state.chosenPanelMainCategory.categories[1]);
    const selection = page.state.chosenPanelSubCategory.panels[0];
    page.handleTestSelect(selection);
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/summary')
  });
});
