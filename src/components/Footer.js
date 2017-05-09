import React from 'react';
import { Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import logoGenome from '../assets/images/logo_footer_g1.png';
import logoGarvan from '../assets/images/logo_footer_garvan.png';

const FooterContainer = styled.div`
  position: relative;
  z-index: 1;
  padding: 50px 20px 20px 20px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  margin-top: 12px;
`;

const FooterContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 55px;
  max-width: 960px;
  font-weight: 300;
  font-size: 16px;
  color: #484848;
  line-height: 16px;
`;

const FooterDisclaimer = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  color: #333c45;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`;

const Header = styled.h1`
  color: black;
  line-height: 16px;
  max-width: 100%;
  display: inline-block;
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 16px;
`;

const Info = styled.div`
  font-weight: 400;
`;

const Contact = styled.a`
  color: #00a6b6;
  text-decoration: none;
  cursor: pointer;
  display: block;
  padding: 8px 0px 8px 0px;

  &:hover {
    color: #00a6b6;
    text-decoration: none;
  }
`;

const FooterBlock = styled.div`
  color: #484848;
  padding: 8px 0px 8px 0px;
  margin: 0;
`;

const FooterLink = styled.a`
  color: #484848;
  text-decoration: none;
  cursor: pointer;
  padding: 8px 0px 8px 0px;
  margin: 0;
  display: block;
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
  margin-left: 15px;
`;

const Subsidiary = styled.div`
  margin-top: 36px;
  padding-left: 113px;
  color: #757575;
  line-height: 20px;
`;

const Disclaimer = styled(Col)`
  font-size: 14px;
  line-height: 21px;
  margin-top: 8px;
  color: #757575;
  margin-left: 0;
`;

const SocialContainer = styled(Col)`
  margin-top: 0;
  text-align: right;
`;

const SocialLogo = styled.a`
  margin-left: 10px;
`;

export default class Footer extends React.Component 
{    
  render() 
  {  
    return( 
      <FooterContainer className="noPrint">
        <FooterContent>
          <Row>
            <Col md={2} style={{ marginRight: 25 }}>
              <Header>Learn More</Header>
              <Info>
                <FooterLink href="http://genomeone-new.webflow.io/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="http://genomeone-new.webflow.io/resources/careers">Careers</FooterLink>
                <FooterLink href="http://genomeone-new.webflow.io/about-us">About Us</FooterLink>
                <FooterLink href="http://genomeone-new.webflow.io/news">News</FooterLink>
                <FooterLink href="http://genomeone-new.webflow.io/contact-us">Contact</FooterLink>
              </Info>
            </Col>

            <Col md={4}>
              <Header>Contact Us</Header>
              
              <Info style={{ color: '#929292' }}>
                <FooterBlock>370 Victoria St.</FooterBlock>
                <FooterBlock>Darlinghurst,</FooterBlock>
                <FooterBlock>NSW 2010, Australia</FooterBlock>
                <FooterBlock>ACN 608 029 732</FooterBlock>
                <Contact href="mailto:enquiries@genome.one?subject=General Inquiry">enquiries@genome.one</Contact>
                <Contact href="tel:+61293598002">+61 2 9359 8002</Contact>
              </Info>
            </Col>

            <LogoContainer md={6} style={{ marginLeft: -25 }}>
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
                  style={{ width: 170 }}/>
              </LogoLink>
              <Subsidiary>
                Genome.One is a wholly owned subsidiary of the Garvan Institute of Medical Research.
              </Subsidiary>
            </LogoContainer>
          </Row>
        </FooterContent>
        <FooterDisclaimer>
          <Row>
            <Disclaimer md={8}>Copyright © 2017 Genome.One. All Rights Reserved</Disclaimer>
            <SocialContainer md={4}>
              <SocialLogo href="https://www.facebook.com/Genome.One/" target="_blank">
                <img height="35" alt="fb" src="http://uploads.webflow.com/58ef79e6af69d159faa3bec0/58fe720eca066f71c96775d8_facebook.svg" />
              </SocialLogo>
              <SocialLogo className="footer-social-link w-inline-block" href="https://twitter.com/GenomeOneHealth" target="_blank">
                <img height="35" alt="twitter" src="http://uploads.webflow.com/58ef79e6af69d159faa3bec0/58fe721857dd045f17ae2afe_twitter.svg" />
              </SocialLogo>
              <SocialLogo className="footer-social-link w-inline-block" href="https://www.linkedin.com/company/genome.one" target="_blank">
                <img height="35" alt="twitter" src="http://uploads.webflow.com/58ef79e6af69d159faa3bec0/58fe7232d89baf2a02258fad_linkedin.svg" />
              </SocialLogo>
            </SocialContainer>
          </Row>
        </FooterDisclaimer>
      </FooterContainer>
    )
  }
}
