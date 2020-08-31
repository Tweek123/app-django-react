import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/actions'
import { Container,  Message, Panel, Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button,FlexboxGrid, Content} from 'rsuite';
import { authorization } from '../../actions/actions'
import { Redirect  } from "react-router-dom";




class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          expand: true,
          formValue: {
            name: '',
            email: '',
            age: '',
            password: '',
            verifyPassword: ''}
        };
      }


    componentDidMount() {
        this.props.dispatch(getUsers())
    }

    render()  {
        console.log(this.props.loggedIn)
        return (
        <div className="show-fake-browser login-page">   

            {this.props.loggedIn? <Redirect to="/statistics" />: false}           
            <Container>
              <Content>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3>Login</h3>} bordered>
                      <Form fluid         
                      onChange={formValue => {
                      this.setState({ formValue: formValue});
                      }}>
                        {this.props.errors.loginError?<Message  className={'login-form__login-error'} type="error" description="Wrong username or password" />: false}
                        <FormGroup>
                          <ControlLabel>Username</ControlLabel>
                          <FormControl name="name"/>
                        </FormGroup>
                        <FormGroup>
                          <ControlLabel>Password</ControlLabel>
                          <FormControl name="password" type="password"/>
                        </FormGroup>
                        <FormGroup>
                          <ButtonToolbar>
                            <Button appearance="primary" onClick={() => this.props.dispatch(authorization(this.state.formValue))}>Sign in</Button>
                          </ButtonToolbar>
                        </FormGroup>
                      </Form>
                    </Panel>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </Content>
            </Container>
        </div>
        )
      }
}


const mapStateToProps = (state) => {
    return {
        users: state.reducer.users,
        loggedIn: state.reducer.loggedIn,
        errors: state.reducer.errors
    };

  };

  export default connect(mapStateToProps)(HomePage);




