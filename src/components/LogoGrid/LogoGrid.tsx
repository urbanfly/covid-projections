import React from 'react';
import ExternalLink from 'components/ExternalLink';
import {
  StyledPartnerLogoGrid,
  StyledPressLogoGrid,
  Logo,
  LogoWrapper,
} from './LogoGrid.style';

export const PartnerLogoGrid = () => {
  return (
    <StyledPartnerLogoGrid>
      <ExternalLink href="https://ghss.georgetown.edu/">
        <Logo src="/images/ghss.png" alt="Georgetown University logo" />
      </ExternalLink>
      <ExternalLink href="http://med.stanford.edu/cerc.html">
        <Logo
          src="/images/cerc.jpg"
          alt="Stanford Medicine Clinical Excellence Research Center logo"
          style={{ transform: 'scale(1.1)' }}
        />
      </ExternalLink>
      <ExternalLink href="https://grandrounds.com/">
        <Logo src="/images/grand-rounds.png" alt="Grand Rounds logo" />
      </ExternalLink>
    </StyledPartnerLogoGrid>
  );
};

export const PressLogoGrid = () => {
  return (
    <StyledPressLogoGrid>
      <LogoWrapper>
        <Logo src="/images/press/nyt.png" alt="New York Times logo" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/wsj.png" alt="The Wall Street Journal logo" />
      </LogoWrapper>
      <LogoWrapper>
        <Logo src="/images/press/vox.png" alt="Vox logo" />
      </LogoWrapper>
    </StyledPressLogoGrid>
  );
};
