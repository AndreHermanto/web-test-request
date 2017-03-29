import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
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
  color:${props => props.selected ? '#77BC1F' : '#000'};
  border-color: ${props => props.selected ? '#77BC1F' : '#ccc'};
  &:hover {
    border-color:#00a6b6;
    color: #00a6b6 !important;
  }

  &.active {
    border-color:#00a6b6;
    color: #00a6b6 !important;
  }

  -webkit-box-shadow: inset 7px 0px 0px 0px ${props => determinePanelColor(props.label)};
  -moz-box-shadow: inset 7px 0px 0px 0px ${props => determinePanelColor(props.label)};
  box-shadow: inset 7px 0px 0px 0px ${props => determinePanelColor(props.label)};
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
  constructor() {
    super();

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
      <FormGroup validationState={validator.status}>
        {label}
        <br/>
        {
          (this.props.options && this.props.options.length > 0) && 
          this.props.options.map((option, i) => {
            let genes = this.getGene(option.genes);
            let totalGene;
            let panels;
      
            if(option.genes !== undefined) {
              totalGene = option.genes.length - 3;
            }
      
            if(this.props.latestSelectId === option.id) {
              panels = <Panel
                        key={i}
                        image={checked} 
                        geneList={this.props.genes}
                        totalGene={totalGene}
                        option={option}
                        genes={genes}
                        valid={validator.status}
                        handleClick={this.handleOnClick}
                        selected={true}
                      />;
            } else {
              panels = <Panel
                        key={i}
                        image={grayCheck}
                        geneList={null}
                        totalGene={totalGene}
                        option={option}
                        genes={genes}
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

function determinePanelColor(label) {
  if(label.search('Core Panel') !== -1) return '#79f5ff';
  if(label.search('Complete Panel') !== -1) return '#00a6b6';
  return '#eee';
}

function determineTag(label) {
  if(label.search('Core Panel') !== -1) return <Tag type="core">Core</Tag>;
  if(label.search('Complete Panel') !== -1) return <Tag type="complete">Complete</Tag>;
  return '';
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
      onClick={() => props.handleClick(props.option)}
      selected={props.selected}
      label={props.option.label}
    >
          <img 
            src={props.image} 
            alt="logo" 
            style={{ height:30, float: 'left'}} />
          
          {determineTag(props.option.label)}
          
          <div style={{ height: 30, verticalAlign: 'middle', display: 'table-cell', paddingLeft: 20, paddingRight: 20 }}>
            {props.option.label}

            {
              (
                props.genes !== undefined &&
                props.geneList === null && 
                props.geneList !== undefined
              ) &&
              <div className="text-muted" style={{ fontSize: 11, marginTop: 2 }}>
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
          </div>

          { 
            (props.geneList !== null && props.geneList !== undefined) &&
            <div> 
              <ControlLabel style={{ marginTop: 16 }}>Included Genes:</ControlLabel>
              <div>{geneList}</div>
            </div>
          }

    </TestContainer>
  )
}

export default TestPanel;