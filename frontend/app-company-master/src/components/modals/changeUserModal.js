import React from 'react';
import User from '../usercomponent/user'
import { connect } from 'react-redux';
import FormGenerateUser from '../forms/formGenerateUser'
import { ChangeUserData, addUser, logout} from '../../actions/actions'
import { ButtonToolbar, Button, Modal } from 'rsuite';
import { closeModalUser, changeUserData } from '../../actions/actions';
import { Input, InputGroup } from 'rsuite';
import { Checkbox, CheckboxGroup, CustomField, FormGroup, ControlLabel,FormControl,Form } from 'rsuite';

var checkBox ={}
var formTextInputs = {}
var form = {}

class BasicDemo extends React.Component {
    constructor(props) {
      super(props);
      

      this.close = this.close.bind(this);
      this.change = this.change.bind(this);
      this.add = this.add.bind(this);
      this.click = this.click.bind(this);

      this.refreshCheckBox = this.refreshCheckBox.bind(this);
    }
    close() {
      this.props.dispatch(closeModalUser())


      
    }

    change() { 
      let data = {};
      let newUser = Object.assign({}, form);
      
      let User = Object.assign({}, this.props.modalUser);
      data.newUser = newUser;
      data.User = User;
      this.props.dispatch(changeUserData(data))

      
    }

    add() {
     
      let User = Object.assign({}, form);
      this.props.dispatch(addUser(User));


    }

    click() {
      if(this.props.modalUser.type === "CHANGE") {

        this.change();

      } else {

        this.add();
      }

    }


    refreshTextFields(data) {
      formTextInputs = data;
      form = Object.assign(formTextInputs, checkBox);
    }

    refreshCheckBox(data) {
      checkBox[data] = !checkBox[data]; 
      form = Object.assign(formTextInputs, checkBox);
    }
    UserInputs() {
        let UserInputs = [];
        console.log(this.props.modalUser);
        for(let key in this.props.modalUser.data) {
          console.log(this.props.modalUser.data[key])
          
          if(typeof(this.props.modalUser.data[key])==='boolean') {
            checkBox[key] = this.props.modalUser.data[key];
            UserInputs.push(
            <div>
             <p>admin</p>
             <Checkbox  value={key} onChange={data => {
              this.refreshCheckBox(data);
            }} 
             defaultChecked={this.props.modalUser.data[key]}/>
            </div>
            
            )
            
          }
          else {

            formTextInputs[key] = this.props.modalUser.data[key]; 
            UserInputs.push(<FormGroup>
              
              <ControlLabel>{key}</ControlLabel>
              <FormControl 
              name={key}
              placeholder={this.props.modalUser.data[key]}
              /></FormGroup>)
          }
        }
        form = Object.assign(formTextInputs, checkBox);
        return (<Form formDefaultValue={formTextInputs} onChange={formValue =>  this.refreshTextFields(formValue)}>
                  {UserInputs}
                </Form>)

    }

    render() {

      let UserInputs = this.UserInputs.bind(this)
      return (
        <div className="modal-container">
          <Modal show={this.props.modalUser.open} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserInputs/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.click} appearance="primary">
                Ok
              </Button>
              <Button onClick={this.close.bind(this)} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
        users: state.reducer.users,
        clientData: state.reducer.clientData,
        user: state.reducer.user,
        loggedIn: state.reducer.loggedIn,
        modalUser: state.reducer.modalUser 
    };

  };

  export default connect(mapStateToProps)(BasicDemo);