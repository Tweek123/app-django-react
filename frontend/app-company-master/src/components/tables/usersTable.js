import React from 'react';
import User from '../usercomponent/user'
import { connect } from 'react-redux';
import FormGenerateUser from '../forms/formGenerateUser'
import { ChangeUserData,  logout, removeUser, addUser} from '../../actions/actions'
import { Table, Button } from 'rsuite';
import  ModalUser  from '../modals/changeUserModal';
import { openModalUser } from '../../actions/actions';

const { Column, HeaderCell, Cell, Pagination } = Table;

class FixedColumnTable extends React.Component {
    constructor(props) {
      super(props);
      this.addUser = this.addUser.bind(this);
      this.editUser = this.editUser.bind(this);
      
    }

    addUser() {
      let form = {
        username: '',
        email: '',
        password: '',
        is_superuser: false
      }

      let data = {
        form: form,
        type: "ADD"
      }

      this.props.dispatch(openModalUser(data))
    }

    editUser(form) {
      let data = {
        form: form,
        type: "CHANGE"
      }

      this.props.dispatch(openModalUser(data))
    }


    render() {
      return (
        <div>
          <Table
            autoHeight={true}
            data={this.props.users}
            onRowClick={data => {
              console.log(data);
            }}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>Usern name</HeaderCell>
              <Cell dataKey="username" />
            </Column>
  
            <Column width={200} fixed>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Admin status</HeaderCell>
              <Cell dataKey="admin" />
            </Column>
  
            <Column width={120} fixed="right">
              <HeaderCell>Action  </HeaderCell>
              <Cell>
                {rowData => {
                  function handleAction(action) {
                    if(action==='edit') {
                      this.editUser(rowData);
                    }
                    
                    else {
                      this.props.dispatch(removeUser(rowData))
                    }
                    
                    
                  }
                  return (
                    <span>
                      <a onClick={handleAction.bind(this,'edit')}> Edit </a>|{' '}
                      <a onClick={handleAction.bind(this,'remove')}> Remove </a>
                    </span>
                  );
                }}
              </Cell>
            </Column>
          </Table>
          <Button className={'users-page__add-button'} appearance="primary" onClick={() => {this.addUser()}}>Add User</Button>
          <ModalUser />
        </div>
      );
    }
  }

//   this.props.dispatch(ChangeUserData())
  const mapStateToProps = (state) => {
    return {
        users: state.reducer.users,
        clientData: state.reducer.clientData,
        user: state.reducer.user,
        loggedIn: state.reducer.loggedIn,
        modalUserOpen: state.reducer.modalUserOpen 
    };

  };

  export default connect(mapStateToProps)(FixedColumnTable);