import React, { Fragment, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
  Wrapper,
  Question,
  Answer,
  Content,
  Header,
  Subheader,
} from 'components/Compare/ModalFaq.style';
import CloseIcon from '@material-ui/icons/Close';

// Locks scroll behind modal:
const BodyScrollLock = createGlobalStyle`
  body {
    height: 100vh;
    overflow: hidden;
  }
`;

const ModalFaq = (props: { handleCloseModal: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.keyCode === 27) {
        props.handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [props, props.handleCloseModal]);

  return (
    <Fragment>
      <BodyScrollLock />
      <Wrapper>
        <CloseIcon onClick={props.handleCloseModal} />
        <Content>
          <Header>Compare table</Header>
          <Subheader>Frequenlty asked questions</Subheader>
          <Question>How are “metro” and “non-metro” counties defined?</Question>
          <Answer>
            You can think of this as urban or rural, but just keep in mind that
            isn’t exact.
            <br />
            <br />
            We follow US Census definitions. A Metro Statistical Area (MSA)
            consists of one or more counties that contain a city of 50,000 or
            more inhabitants. We define “metro counties” as counties belonging
            to MSAs; “non metro counties” as counties not within an MSA.
          </Answer>
          <Question>How are “college” counties defined?</Question>
          <Answer>
            We want to highlight counties where the college population may be
            impacting the local COVID dynamics.
            <br />
            <br />
            Counties in which typical full-time student enrollment accounts for
            at least 5% of the total county population are labeled as “College”
            counties. This labels 334 counties as “College” counties
            (approximately 10% of all counties).
            <br />
            <br />
            Note that these colleges may or may not currently have in-person
            classes / activities.
          </Answer>
          <Question>Why do some counties have missing data?</Question>
          <Answer>
            Most states report contact tracing at the state-level only, meaning
            we don’t receive county-level data. This is sometimes common for
            other metrics as well. We suggest using state-level pages in those
            situations.
          </Answer>
        </Content>
      </Wrapper>
    </Fragment>
  );
};

export default ModalFaq;
