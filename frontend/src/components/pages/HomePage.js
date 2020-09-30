import React from 'react';
import { Container, FlexboxGrid, Content} from 'rsuite';
import FormLogin from "../forms/FormLogin"

const HomePage = () => {
  return(
    <div className="show-fake-browser login-page"> 
        <Container>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <FormLogin/>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
      </Container>
    </div>

  )
}

export default HomePage;

