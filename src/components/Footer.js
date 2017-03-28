import React from 'react';
import { Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import logoGenome from '../assets/images/logo_footer_g1.png';
import logoGarvan from '../assets/images/logo_footer_garvan.png';

const FooterContainer = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 50px;
  padding-bottom: 0;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  margin-top: 12px;
`;

const FooterContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 55px;
  max-width: 960px;
  padding-left: 20px;
  padding-right: 20px;
`;

const FooterBreakLine = styled.hr`
  padding: 0;
  margin: 0;
  color: #333c45;
`;

const FooterDisclaimer = styled.div`
  padding-top: 12px;
  padding-bottom: 20px;
  color: #333c45;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = styled.h1`
  color: #000;
  font-size: 13px;
  line-height: 19px;
  letter-spacing: 3px;
  max-width: 100%;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const Info = styled.div`
  line-height: 26px;
  font-weight: 400;
`;

const MailTo = styled.a`
  color: #00a6b6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #00a6b6;
    text-decoration: none;
  }
`;

const FooterLink = styled.a`
  color: #000;
  text-decoration: none;
  cursor: pointer;
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
  color: #333c45;
  line-height: 20px;
`;

const Disclaimer = styled(Col)`
  font-size: 10px;
  letter-spacing: 1px;
  margin-top: 8px;
  text-transform: uppercase;
  color: #929292;
`;

const SocialContainer = styled(Col)`
  margin-top: 0;
  text-align: right;
`;

const SocialLogo = styled.a`
  padding-left: 20px;
  opacity: .7;
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
              <Header>Learn More</Header>
              <Info>
                <FooterLink href="http://genomeone-new.webflow.io/partners">Partners</FooterLink>
                <br />
                <FooterLink href="http://genomeone-new.webflow.io/privacy-policy">Privacy Policy</FooterLink>
                <br />
                <FooterLink href="http://genomeone-new.webflow.io/resources/careers">Careers</FooterLink>
                <br />
                <FooterLink href="http://genomeone-new.webflow.io/about-us">About us</FooterLink>
                <br />
                <FooterLink href="http://genomeone-new.webflow.io/news">News</FooterLink>
              </Info>
            </Col>

            <Col md={3}>
              <Header>Contact Us</Header>
              <MailTo href="mailto:enquiries@genome.one?subject=General Inquiry">enquiries@genome.one</MailTo>
              <Info style={{ color: '#929292' }}>
                P +61 2 9359 8002<br />
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
        <FooterBreakLine />
        <FooterDisclaimer>
          <Row>
            <Disclaimer md={8}>COPYRIGHT © 2016 GENOME.ONE. ALL RIGHTS RESERVED</Disclaimer>
            <SocialContainer md={4}>
              <SocialLogo href="https://www.facebook.com/Genome.One/" target="_blank">
                <img height="23" alt="fb" src="https://daks2k3a4ib2z.cloudfront.net/56fb123ccf591b312d55dbb6/5897e8d62a25945021987407_FB-f-Logo__blue_100.png" />
              </SocialLogo>
              <SocialLogo className="footer-social-link w-inline-block" href="https://twitter.com/GenomeOneHealth" target="_blank">
                <img height="35" alt="twitter" src="https://daks2k3a4ib2z.cloudfront.net/56fb123ccf591b312d55dbb6/5897e87dbfd5fa6c63bc313e_TwitterLogo_%2355acee.png" />
              </SocialLogo>
            </SocialContainer>
          </Row>
        </FooterDisclaimer>
      </FooterContainer>
    )
  }
}
