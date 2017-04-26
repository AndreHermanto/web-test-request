import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  Glyphicon,
  Row,
  Col,
  Label
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback
} from './../../../components/SharedStyle';
import styled from 'styled-components';
import checked from './../../../assets/images/checked.svg';
import grayCheck from './../../../assets/images/checked-gray.svg';

const Gene = styled(Label)`
  margin-right: 4px;
  display: inline-block !important;
  font-weight: 300 !important;
  background: ${props => props['data-inCore'] ? '#7788aa' : '#00a6b6'} !important;
`;

const TestContainer = styled.div`
  padding: 11px 0px 11px 21px !important;
  border-radius: 0px;
  background-color: #fff;
  border: 1px solid;
  margin: 6px 0 6px 0;
  cursor: pointer;
  color:${props => props.selected ? '#00a6b6' : '#000'};
  border-color: ${props => props.selected ? '#00a6b6' : '#ccc'};
  &:hover {
    border-color: #00a6b6;
    color: #00a6b6 !important;
  }

  &.active {
    border-color: #00a6b6;
    color: #00a6b6 !important;
  }
`;

const Arrow = styled.span`
  float: right;
  margin-top: -25px;
  font-size: 18px;
  margin-right: 8px;
  color:${props => props.selected ? '#00a6b6' : '#ccc'};
`;

/**
 * This creates a set of test panel category buttons via a single component.
 */
class TestPanel extends Component {
  constructor() {
    super();

    this.getValidator = this.getValidator.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  getValidator() {
    if(!this.props.onValidate) {
      return { status: null, rule: {} };
    } else {
      return this.props.onValidate[this.props.field] || { status: null, rule: {} };
    }
  }

  getLabel() {
    return <ControlLabel>
      {this.props.label}
      <SubLabel>Required</SubLabel>
    </ControlLabel>
  }

  handleOnClick(panel) {
    this.props.handleClick(panel);
  }

  render() { 
    let validator = this.getValidator();
    let label = this.getLabel();
    return (
      <FormGroup validationState={validator.status}>
        {label}
        <br/>
        {
          (this.props.options && this.props.options.length > 0) && 
          this.props.options.map((option, i) => {

            let panels;
      
            if(this.props.latestSelectId === option.id) {
              panels = <Panel 
                        key={i}
                        width={this.props.width}
                        image={checked}
                        option={option}
                        valid={validator.status}
                        handleClick={this.handleOnClick}
                        selected={true}
                        />;
            } else {
              panels = <Panel 
                        key={i}
                        width={this.props.width}
                        image={grayCheck}
                        option={option}
                        valid={validator.status}
                        handleClick={this.handleOnClick}
                        selected={false}
                        />;
            }
      
            return panels;
          })
        }
        <ValidationFeedback>{validator.feedback}</ValidationFeedback> 
      </FormGroup>
    );
  }
}

function Panel(props) {
  return (
    <TestContainer
      valid={props.valid}
      width={props.width}
      selected={props.selected}
      onClick={() => props.handleClick(props.option)}>
      <img 
        src={props.image} 
        alt="logo" 
        style={{ height:30, float: 'left'}} />
      <div style={{ height: 30, width:'inherit', verticalAlign: 'middle', display: 'table-cell', paddingLeft: 20 }}>
        {props.option.label}
      </div>
      {
        props.option.label !== 'Whole Genome Analysis' && props.option.label !== 'Polycystic Kidney Disorder' &&
        <Arrow selected={props.selected}>
          <Glyphicon glyph={props.selected ? 'triangle-bottom' : 'triangle-left'} />
        </Arrow>
      }
      {
        (props.option.label === 'Polycystic Kidney Disorder' && props.selected) &&
        <GeneList option={props.option.categories[0].panels[0]}/>
      }
    </TestContainer>
  )
}

/*
* display gene list if PKD is selected
*/
function GeneList(props) {
  var geneList = props.option.geneLists ? props.option.geneLists.slice(0) : [];
  geneList.map((list) => {
    list.id = list.type;
    list.label = list.type.toUpperCase().slice(0,1) + list.type.slice(1);   
    return list;
  })
  return (
    <div style={{ marginTop: 20 }}>
    {
      geneList.map((list, $index) => {
        return <Row key={$index} style={{ padding: 8 }}>
          <Col lg={3}>
            {list.label} Panel <small style={{ display: 'inline-block' }}>({list.genes.length} genes included)</small>
          </Col>
          <Col lg={9}>
            {list.genes.map((gene, $geneIndex) => {
              var inCore = false; 
              if(geneList.length > 1) {
                geneList[0].genes.forEach((coregene) => {
                  if(coregene === gene) inCore = true;
                });
              }
              return <Gene key={$geneIndex} data-inCore={inCore} >{gene}</Gene> 
            })}
          </Col>
        </Row>
      })
    }
    </div>
  )
}

export default TestPanel;