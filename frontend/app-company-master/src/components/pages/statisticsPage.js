import React from 'react';
import { connect } from 'react-redux';
import { getClientData,  logout} from '../../actions/actions'
import { Container, Header, Sidenav, Nav,Icon, Content, Sidebar } from 'rsuite';
import { Link } from "react-router-dom";
import LineExample from '../chart';
import { Redirect  } from "react-router-dom";

const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };

  const userStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: 'white',
    color: "#575757",
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  };
  
  const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  };
  


const now = new Date()
const past = now.setDate(now.getDate() - 1);
const dateRange = [new Date(past), now]

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          expand: true
        };

      }
      
    componentDidMount() {

      this.props.dispatch(getClientData(dateRange))
        
    }

    chartStatistics() {
        if(this.props.clientData.jsonArray === undefined) {
            
            return  (<div className='col'>
      
                    </div>)
        } else {
            return (<div className='col'>
                    <LineExample/>
                   </div>)
    
        }
      };

    render()  { 

        const { expand } = this.state;
        const Graphic = this.chartStatistics.bind(this);

        return (
            <div className="show-fake-browser sidebar-page">
            {this.props.loggedIn? false: <Redirect to="/" />}    
            <Container>
              <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={expand ? 260 : 56}
                collapsible
              >
                <Sidenav.Header>
                  <div style={headerStyles}>
                    <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                    <span style={{ marginLeft: 12 }}> BRAND</span>
                  </div>
                </Sidenav.Header>
                <Sidenav
                  expanded={expand}
                  defaultOpenKeys={['3']}
                  appearance="subtle"
                >
                  <Sidenav.Body>
                    {this.props.loggedIn? 
                        <div style={userStyles}>
                            <Icon icon="user" size="lg" style={{ verticalAlign: 0 }} />
                            <span style={{ marginLeft: 12 }}>{this.props.user.username}</span>
                        </div>: false}
                    <Nav>
                      <Link to={"/statistics"}><Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />}>
                        Statistics
                      </Nav.Item></Link>
                      {this.props.user.admin? <a href="http://localhost:8000/admin/"> <Nav.Item eventKey="2" icon={<Icon icon="id-card" />}>
                        Django admin
                      </Nav.Item></a>: false} 
                      {this.props.user.admin? <Link to={"/users"}><Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                        Users
                      </Nav.Item></Link>: false}
                      <Link to={"/"}><Nav.Item 
                      eventKey="3" 
                      icon={<Icon icon="sign-out" />}
                      onClick= {() => this.props.dispatch(logout())}>
                        Sign out
                      </Nav.Item></Link>
                    </Nav>
                  </Sidenav.Body>
                </Sidenav>
                {/* <NavToggle expand={expand} onChange={this.handleToggle} /> */}
              </Sidebar>
    
              <Container>
                <Header>
                  <h2>Statistics</h2>
                </Header>
                <Content><Graphic/></Content>
              </Container>
            </Container>
          </div>
        )
      }
}


const mapStateToProps = (state) => {
    return {
        users: state.reducer.users,
        clientData: state.reducer.clientData,
        user: state.reducer.user,
        loggedIn: state.reducer.loggedIn
    };

  };

  export default connect(mapStateToProps)(Statistics);


