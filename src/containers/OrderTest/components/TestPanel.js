import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  Label,
  Row,
  Col,
  Radio
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
  border: 1px solid #ccc;
  margin-top: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  line-height: 1.2;
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

  -webkit-box-shadow: inset 7px 0px 0px 0px ${props => props.selected ? '#00a6b6' : '#ccc'};
  -moz-box-shadow: inset 7px 0px 0px 0px ${props => props.selected ? '#00a6b6' : '#ccc'};
  box-shadow: inset 7px 0px 0px 0px ${props => props.selected ? '#00a6b6' : '#ccc'};
`;

const Tag = styled(Label)`
  float: right;
  margin-right: 12px;
  padding: 4px 8px 3px 8px !important;
  background: ${props => props.type === 'core' ? '#00d6e6' : '#007580'} !important;
`; 

/**
 * This creates a set of gene label buttons via a single component.
 */
class TestPanel extends Component {
  constructor(props) {
    super(props);

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

            if(this.props.preSelect.id === option.id) {
              panels = <Panel
                        key={i}
                        image={checked} 
                        option={option}
                        valid={validator.status}
                        panelClick={this.handleOnClick}
                        typeSelect={this.props.handleTypeClick}
                        preSelectType={this.props.preSelect.geneLists[0] ? this.props.preSelect.geneLists[0].type : 'complete'}
                        formState={this.state}
                        selected={true}
                      />;
            } else {
              panels = <Panel
                        key={i}
                        image={grayCheck}
                        option={option}
                        valid={validator.status}
                        panelClick={this.handleOnClick}
                        typeSelect={this.props.handleTypeClick}
                        preSelectType={this.props.preSelect.geneLists[0] ? this.props.preSelect.geneLists[0].type : 'complete'}
                        formState={this.state}
                        selected={false}
                      />;
            }
      
            return panels;
          })
        }
        <br/>
        <ValidationFeedback>{validator.feedback}</ValidationFeedback> 
      </FormGroup>
    );
  }
}

function determineTag(label) {
  if(label.search('Core Panel') !== -1) return <Tag type="core">Core</Tag>;
  if(label.search('Complete Panel') !== -1) return <Tag type="complete">Complete</Tag>;
  return '';
}

function Panel(props) {
  // Process in a way that the format would work with RadioSet module - needs id and label.
  var geneList = props.option.geneLists ? props.option.geneLists.slice(0) : [];
  geneList.map((list) => {
    list.id = list.type;
    list.label = list.type.toUpperCase().slice(0,1) + list.type.slice(1);   
    return list;
  })

  return (
    <TestContainer
      valid={props.valid}
      selected={props.selected}
      label={props.option.label}
      onClick={() => props.panelClick(props.option)}
    >
      <div>
        <img 
          src={props.image} 
          alt="logo" 
          style={{ height:30, float: 'left'}} />

        {determineTag(props.option.label)}

        <div style={{ 
          height: 30, 
          verticalAlign: 'middle', 
          display: props.selected ? 'initial' : 'table-cell', 
          paddingLeft: 20, 
          paddingRight: 20 
        }}>
        
          {props.option.label}
        </div>
      </div>
        
      {
        props.selected &&
        <div style={{ marginTop: 32 }}>
          {
            geneList.map((list, $index) => {
              return <Row key={$index} style={{ padding: 8 }}>
                <Col lg={3}>
                  <Radio
                    style={{ margin: 0, color: list.type === 'core' ? '#7788aa' : '#00a6b6'}}
                    key={$index}
                    name="type" 
                    value={list.type}
                    onClick={(event) => props.typeSelect(event, list)}
                    defaultChecked={list.type === props.preSelectType}
                  >
                    {list.label} Panel <small style={{ display: 'inline-block' }}>({list.genes.length} genes included)</small>
                  </Radio>
                </Col>
                <Col lg={9}>
                  {list.genes.map((gene, $geneIndex) => {
                    // detect whether the gene is in both core and complete.
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
      }
    </TestContainer>
  )
}

export default TestPanel;