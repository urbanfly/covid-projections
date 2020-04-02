import React from 'react';
import Typography from '@material-ui/core/Typography';
import QuoteIcon from '@material-ui/icons/FormatQuoteRounded';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';

import EndorsementCard from 'components/EndorsementCard/EndorsementCard';
import { ENDORSERS } from 'enums';
import {
  Content,
  EndorseLink,
  EndorsersWrapper,
  Quote,
  QuoteContainer,
  Wrapper,
} from './Endorsements.style';

const Endorsements = () => {
  return (
    <Wrapper>
      <Content>
        <QuoteContainer>
          <Quote>
            <QuoteIcon />
            <Typography variant="h4" component="p">
              While no projection is perfect, we endorse this tool and model as
              a valid and important way to frame the decisions political leaders
              must make now.
            </Typography>
          </Quote>
          <EndorseLink href={'mailto:endorse@covidactnow.org'}>
            <div>Sign up to endorse</div>
            <CheckCircleOutline />
          </EndorseLink>
        </QuoteContainer>
        <EndorsersWrapper
          container
          alignItems={'stretch'}
          spacing={0}
          wrap={'wrap'}
        >
          {ENDORSERS.map((e, index) => (
            <Grid item key={index} xs={12} md={e.size}>
              <EndorsementCard {...e} />
            </Grid>
          ))}
        </EndorsersWrapper>
        <span data-sumome-listbuilder-embed-id="a5e4680c84878d727c01eac4fbfb8bf4d3269f51339bf3499040aa642d59b6a2"></span>
      </Content>
    </Wrapper>
  );
};

export default Endorsements;
