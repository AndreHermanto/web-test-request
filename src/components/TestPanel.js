import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  Row,
  Col,
  Label
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback
} from './SharedStyle';
import styled from 'styled-components';
import checked from '../assets/images/checked.svg';
import grayCheck from '../assets/images/checked-gray.svg';

const Gene = styled(Label)`
  margin-right: 4px;
  display: inline-block !important;
  font-weight: 300 !important;
`;

const TestContainer = styled.div`
  padding: 12px !important;
  border-radius: 0px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  color:${props => props.valid !== 'error' ? 'black' : '#A94445'};
  &:hover {
    border-color:#00a6b6;
    color: #00a6b6 !important;
  }

  &.active {
    border-color:#00a6b6;
    color: #00a6b6 !important;
  }
`;

/**
 * This creates a set of gene label buttons via a single component.
 */
class TestPanel extends Component {
  constructor() {
    super();
    this.state = {
      image:''
    }
    this.getValidator = this.getValidator.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.getGene = this.getGene.bind(this);
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

  getGene(genes) {
    let gene = [];
    if(genes !== undefined) {
      genes.map((g, i) =>{
        if(i < 3) return gene.push(g);
        return gene;
      })
      return gene;
    }
  }

  handleOnClick(panel) {
    this.props.handleClick(panel);
  }

  render() { 
    let validator = this.getValidator();
    let label = this.getLabel();
    return (
      <FormGroup  validationState={validator.status}>
        {label}
        <br/>
        {
          this.props.options.length > 0 && 
          this.props.options.map((option, i) =>
          {
            let genes = this.getGene(option.genes);
            let totalGene;
            let panels;
            if(option.genes !== undefined)
            {
              totalGene = option.genes.length - 3;
            }
            if(this.props.latestSelectId === option.id)
            {
              panels = <Panel key={i} image={checked} geneList={this.props.genes}
              totalGene={totalGene} option={option} genes={genes} valid={validator.status} handleClick={this.handleOnClick}/>;;
            }
            else {
              panels = <Panel key={i} image={grayCheck} geneList={null} 
              totalGene={totalGene} option={option} genes={genes} valid={validator.status} handleClick={this.handleOnClick}/>;
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
  let geneList;
  if(props.geneList !== undefined && props.geneList !== null) {
    geneList = props.geneList.map((gene, $index) => {
      return <Gene key={$index}>{gene}</Gene> 
    })
  }
  else {
    geneList = '';
  }
  return (
    <TestContainer
      valid={props.valid}
      onClick={() => props.handleClick(props.option)}>
      <Row style={{ padding: '9px' }}>
        <Col md={1}>
          <img 
            src={props.image} 
            alt="logo" 
            style={{ height:40, marginLeft: -4 }} />
        </Col>
        <Col md={11}>
          {
            props.option.label === 'Whole Genome Analysis' ?
            <div style={{marginTop:10}}>{props.option.label}</div> :
            <div>{props.option.label}</div>
          }
          {
            props.genes !== undefined &&
            <div className="text-muted" style={{ fontSize: 12.5 }}>
              { 
                props.genes.map((g, i) => {
                  return (<span key={i}> {g}</span>)
                })
              }
              {
                props.totalGene > 0 &&
                <span> + {props.totalGene} more </span>
              }
            </div>
          }
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          { 
            (props.geneList !== null && props.geneList !== undefined) &&
            <div style={{ padding: '8px 8px 0 8px' }}> 
              <ControlLabel>Available Genes:</ControlLabel>
              <div>{geneList}</div>
            </div>
          }
        </Col>
      </Row>
    </TestContainer>
  )
}

export default TestPanel;