import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppMetaTags from 'components/AppMetaTags/AppMetaTags';
import ShareBlock from 'components/ShareBlock/ShareBlock';
import StapledSidebar, {
  SidebarLink,
  SectionHeader,
} from 'components/StapledSidebar/StapledSidebar';
import ExternalLink from 'components/ExternalLink';
import { COLOR_MAP } from 'common/colors';
import imgReponseSimulatorUrl from 'assets/images/response-simulator-screenshot.png';

import {
  Wrapper,
  Content,
  Header,
  GetStartedBox,
  GetStartedList,
  SimulatorTab,
  ImageContainer,
} from './Resources.style';

export const COVID_RESPONSE_SIMULATOR_URL =
  'https://docs.google.com/spreadsheets/u/3/d/1PTBTp8z49IXexkV02wacWLoyv1A2GtlVFYVqI4APPR8/copy#gid=1190280212';

const sidebar = (
  <React.Fragment>
    <SidebarLink href="#covid-response-simulator">
      COVID Response Simulator
    </SidebarLink>
    <SidebarLink href="#model">SEIR Epidemiology Model</SidebarLink>
    <SidebarLink href="#api">API</SidebarLink>
    <SidebarLink href="#csv-files">CSV Files</SidebarLink>
    <SidebarLink href="#embed">Embed</SidebarLink>
  </React.Fragment>
);

const Resources = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AppMetaTags
        canonicalUrl="/resources"
        pageTitle="Resources"
        pageDescription="Free COVID data resources — API, embeds, downloadable CSVs — to help governments and other partners."
      />
      <Header>
        <Content>
          <Typography variant="h3" component="h1">
            Resources
          </Typography>
        </Content>
      </Header>
      <Content>
        <StapledSidebar sidebar={sidebar}>
          <SectionHeader
            variant="h4"
            component="h2"
            id="covid-response-simulator"
          >
            COVID Response Simulator
          </SectionHeader>
          <Typography variant="body1" component="p">
            Try it{' '}
            <ExternalLink href="/covid-response-simulator-redirect">
              here
            </ExternalLink>
            .
          </Typography>
          <Typography variant="body1" component="p">
            The COVID Response Simulator is a localized, spreadsheet version of
            the public Covid Act Now (CAN) model. With it, you can take a
            powerful{' '}
            <ExternalLink href="https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SEIR_model">
              SEIR epidemiology model
            </ExternalLink>{' '}
            and customize it for your county to help plan your response to
            COVID. The inputs and assumptions in the simulator are modifiable
            and can be changed to reflect your local realities.
          </Typography>
          <Typography variant="body1" component="p">
            In addition, you can project the impact of specific
            Non-Pharmaceutical Interventions (NPIs) by adjusting customizable
            levels of public compliance and closure for:
          </Typography>
          <ul>
            <li>Schools and universities</li>
            <li>Large events</li>
            <li>Bars and restaurants</li>
            <li>Offices and factories</li>
            <li>Houses of worship</li>
            <li>Personal care </li>
            <li>Nonessential retail</li>
            <li>Essential retail</li>
            <li>Entertainment</li>
            <li>Outdoor recreation</li>
          </ul>
          <Typography variant="body1" component="p">
            You’ll also be able to simulate the impact of different levels of
            compliance with mask mandates and shelter-in-place orders, as well
            as modify the demographic distribution of your county’s population.
            Based on your inputs, the simulator generates data and graphs
            illustrating COVID forecasts with and without these NPIs, including
            estimated case numbers and hospitalizations.
          </Typography>
          <ImageContainer>
            <picture>
              <a href={imgReponseSimulatorUrl}>
                <img
                  src={imgReponseSimulatorUrl}
                  alt="Two screenshots showing a Google sheet. In the first tab we see where you can input your information, and in the second tab you can see the resulting graph and table that is exported."
                />
              </a>
            </picture>
          </ImageContainer>
          <GetStartedBox>
            <Typography variant="h5" component="h3">
              Get started
            </Typography>
            <GetStartedList>
              <li>
                <Typography variant="body1" component="p">
                  Before you begin, you can watch a full tutorial (30 minutes)
                  on the simulator{' '}
                  <ExternalLink href="https://youtu.be/6lYf9ry1DWE">
                    here
                  </ExternalLink>{' '}
                  or a shorter tutorial (10 minutes) on how to use the simulator
                  specifically for modeling NPIs{' '}
                  <ExternalLink href="https://youtu.be/xiI_kC8hGTA">
                    here
                  </ExternalLink>
                  .
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="p">
                  Click on{' '}
                  <ExternalLink href="/covid-response-simulator-redirect">
                    this link
                  </ExternalLink>{' '}
                  to create a copy of the simulator for your use. You’ll be
                  prompted to make a copy so that you can work in your own
                  document.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" component="p">
                  Review the information in the first tab in{' '}
                  <SimulatorTab color={COLOR_MAP.ORANGE_DARK.BASE}>
                    Orange
                  </SimulatorTab>{' '}
                  labeled “About”. Then continue onward to the second tab in{' '}
                  <SimulatorTab color={COLOR_MAP.GREEN.BASE}>
                    Green
                  </SimulatorTab>{' '}
                  labeled “Location and Inputs Setup”.
                </Typography>
              </li>
            </GetStartedList>
          </GetStartedBox>
          <Typography variant="body1" component="p">
            <i>
              If you have any questions about our model or the data we use,
              reach out to us at{' '}
              <ExternalLink href="mailto:info@covidactnow.org">
                info@covidactnow.org
              </ExternalLink>
              . You can also learn more on our{' '}
              <ExternalLink href="https://www.youtube.com/channel/UChs298932BKWanjwWLVUO4w">
                YouTube channel
              </ExternalLink>
              .{' '}
            </i>
          </Typography>
          <SectionHeader variant="h4" component="h2" id="model">
            SEIR Epidemiology Model
          </SectionHeader>
          <Typography variant="body1" component="p">
            Our model is open source and{' '}
            <a
              href="https://github.com/covid-projections/covid-data-model"
              target="_blank"
              rel="noopener noreferrer"
            >
              available on GitHub
            </a>
            .
          </Typography>
          <SectionHeader variant="h4" component="h2" id="api">
            API
          </SectionHeader>
          <Typography variant="body1" component="p">
            We launched the{' '}
            <a
              href="https://github.com/covid-projections/covid-data-model/blob/master/api/README.V1.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Covid Act Now API
            </a>{' '}
            to make the data that powers our model available to anyone, free of
            charge, under a{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Creative Commons 4.0 license
            </a>
            .
          </Typography>
          <Typography variant="body1" component="p">
            Specifically, our API exposes:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                <strong>Reported data:</strong> State and county level data for
                confirmed cases, deaths, and hospital bed capacity. The data is
                collected from{' '}
                <a
                  href="https://docs.google.com/presentation/d/1XmKCBWYZr9VQKFAdWh_D7pkpGGM_oR9cPjj-UrNdMJQ/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  a number of sources
                </a>{' '}
                and is updated daily.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                <strong>Forward projections:</strong> State- and county-level
                projections for hospitalizations and deaths based on several
                possible interventions. This data is generated from our model.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" component="p">
            In the future, we intend to make more data available, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1" component="p">
                Additional file formats like shapefiles for GIS systems.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" component="p">
                Integrations with data visualization products, such as{' '}
                <a
                  href="https://www.tableau.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tableau
                </a>
                .
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" component="p">
            In order to safely reopen the country and keep COVID in check, our
            country must work together in an unprecedented fashion. We hope the
            data we provide plays a small, positive role. Please use it, adapt
            it, visualize it, and otherwise have at it!
          </Typography>
          <Typography variant="body1" component="p">
            For more on the API{' '}
            <a
              href="https://blog.covidactnow.org/covid-act-now-api-intervention-model/"
              target="_blank"
              rel="noopener noreferrer"
            >
              see our blog post
            </a>
            .
          </Typography>
          <SectionHeader variant="h4" component="h2" id="csv-files">
            CSV Files
          </SectionHeader>
          <Typography variant="body1" component="p">
            If you prefer a spreadsheet to code, we have you covered. See our{' '}
            <a
              href="https://blog.covidactnow.org/export-covid-act-now-data-spreadsheet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              blog post
            </a>{' '}
            for full details on how to import our data into Excel or Google
            Sheets.
          </Typography>
          <SectionHeader variant="h4" component="h2" id="embed">
            Embed
          </SectionHeader>
          <Typography variant="body1" component="p">
            We want our data and modeling to be available to all who are
            interested, including by third parties. That’s why we’ve made our
            data embeddable by other publishers.
          </Typography>
          <Typography variant="body1" component="p">
            Read our{' '}
            <a
              href="https://blog.covidactnow.org/data-feeds/"
              target="_blank"
              rel="noopener noreferrer"
            >
              blog post
            </a>{' '}
            for instructions for how to use our embed. Here's what it looks like
            live:
          </Typography>
          <iframe
            src="https://covidactnow.org/embed/us/co"
            title="CoVid Act Now"
            width="350"
            height="700"
            frameBorder="0"
            scrolling="no"
          />
        </StapledSidebar>
      </Content>
      <ShareBlock />
    </Wrapper>
  );
};

export default Resources;
