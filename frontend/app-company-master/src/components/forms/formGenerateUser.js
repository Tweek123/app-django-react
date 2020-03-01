import React from 'react';
import { addUser } from "../../actions/actions";
import { connect } from 'react-redux';

class formGenerate  extends React.Component {
    constructor(props) {
        super(props);
        this.form = new Object;
    }


    render()  {
            return(
            <div className="container-contact100">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form" >
                        <span className="contact100-form-title">
                            GENERATE USER
                        </span>
        
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" placeholder="First name" 
                            ref={(inputFirstName) => { this.form.firstName = inputFirstName; }}></input>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" placeholder="Last name" 
                            ref={(inputLastName) => { this.form.lastName = inputLastName; }}></input>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" placeholder="Position" 
                            ref={(inputPosition) => { this.form.position = inputPosition; }}></input>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" placeholder="Adress" 
                            ref={(inputAdress) => { this.form.adress = inputAdress; }}></input>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input className="input100" type="text" placeholder="Email" 
                            ref={(inputEmail) => { this.form.email = inputEmail; }}></input>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn"
                            onClick={() => this.props.dispatch(addUser(this.form))}>
                                generate user
                            </button>
                        </div>
                    </div>
                </div>                
            </div>
            
            )
        
      }
}

const mapStateToProps = (state) => {

    return {
    users: state.reducer.users,
    };
  };



  export default connect(mapStateToProps)(formGenerate);

