import React from 'react';
import { Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import logoGenome from '../assets/images/logo_footer_g1.png';
import logoGarvan from '../assets/images/logo_footer_garvan.png';

const FooterContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 60px;
  padding-bottom: 0;
  background-color: #000;
`;

const FooterContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 940px;
`;

const FooterDisclaimer = styled.div`
  margin-top: 65px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 17%;
  padding-right: 17%;
  border-top: 1px solid #323232;
  color: #6b6b6b;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.h1`
  color: #fff;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 3px;
  max-width: 100%;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Info = styled.div`
  color: #b8b8b8;
  line-height: 26px;
  font-weight: 400;
`;

const LogoContainer = styled(Col)`
  margin-bottom: 15px;
  padding-top: 5px;
  text-align: right;
`;

const Logo = styled.img`
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
`;

const LogoLink = styled.a`
  margin-right: 15px;
`;

const Subsidiary = styled.div`
  margin-top: 36px;
  padding-left: 113px;
  color: #727272;
  line-height: 20px;
`;

const Disclaimer = styled(Col)`
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const SocialContainer = styled(Col)`
  margin-top: 0;
  text-align: right;
`;


export default class Footer extends React.Component 
{    
  render() 
  {  
    return( 
      <FooterContainer className="noPrint">
        <FooterContent>
            <Row>
              <Col md={3}>
                <Header>Contact</Header>
                <Info>P +61 2 9359 8002</Info>
                <Info>
                  370 Victoria St.
                  <br />
                  Darlinghurst, NSW 2010,
                  <br />
                  Australia
                  <br />
                  <br />
                  ACN 608 029 732
                </Info>
              </Col>
              
              <Col md={3}>
                <Header>Links</Header>
                <Info>
                  FAQ
                  <br />
                  Partners
                  <br />
                  Privacy Policy
                  <br />
                  Patient Website
                </Info>
              </Col>
      
              <LogoContainer md={6}>
                <LogoLink href="http://www.garvan.org.au/">
                  <Logo 
                    src={logoGarvan} 
                    alt="logo" 
                    style={{ width: 150 }}/>
                </LogoLink>
                <LogoLink href="http://www.genome.one/">
                  <Logo 
                    src={logoGenome} 
                    alt="logo" 
                    style={{ width: 132 }}/>
                </LogoLink>
                <Subsidiary>
                  Genome.One is a wholly owned subsidiary of the Garvan Institute of Medical Research.
                </Subsidiary>
              </LogoContainer>
            </Row>
        </FooterContent>
        <FooterDisclaimer>
            <Row>
              <Disclaimer md={8}>COPYRIGHT © 2016 GENOME.ONE. ALL RIGHTS RESERVED</Disclaimer>
              <SocialContainer md={4}>
                <img height="20" style={{marginRight: 25}} alt="facebook" src="https://daks2k3a4ib2z.cloudfront.net/56fb123ccf591b312d55dbb6/5775bd6c191ec28b22cd6534_facebook.svg" />
                <img height="24" alt="twitter" src="https://daks2k3a4ib2z.cloudfront.net/56fb123ccf591b312d55dbb6/5775bd6c191ec28b22cd6535_twitter.svg" />
              </SocialContainer>
            </Row>
        </FooterDisclaimer>
      </FooterContainer>
    )
  }
}
