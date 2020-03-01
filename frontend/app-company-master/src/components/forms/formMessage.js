import React from 'react';
import { addComment } from "../../actions/actions";
import { connect } from 'react-redux';

class formMessage  extends React.Component {
    constructor(props) {
        
        super(props);
        this.form = new Object;

        this.notValid = new Object;
        this.notValid.title = false;
        this.notValid.comment = false;
        this.notValid.phoneLenght = false;
        this.notValid.phone1 = false;
        this.notValid.phone2 = false;
        this.notValid.phone = false;
        this.notValid.valid = true;

        this.messageFocus = false;
        this.mouseButtonLeave = false; 

        this.state = {
            refresh: false
        }
    }


    mouseButtonOver() {
       // console.log('Over\n');
        this.mouseButtonLeave = true;
    }
    
    mouseButtonOut() {
       // console.log('Out\n');
        this.mouseButtonLeave = false;
    
    }
    
    enableButton() {
        this.messageFocus = true;  
        this.notValid.valid = true;          
    }
    
    inputChange() {
       // console.log('inputChange\n');
        this.checkValid();
    }
    click() {  
      //  console.log('clicked\n');
        this.checkValid();

        if(this.messageFocus) {

            if(this.notValid.valid === true) {
                this.props.dispatch(addComment(this.form, this.props.userID))
            }
            this.messageFocus = false;
        }

        
    
    }
        
    disableButton() {
       // console.log('disable\n');        
        if(!this.mouseButtonLeave) {
          this.notValid.valid = false;
        }
    }
    
    checkValid() {
       // console.log('checkvalid\n');

        this.notValid.title = false;
        this.notValid.comment = false;
        this.notValid.phoneLenght = false;
        this.notValid.phone1 = false;
        this.notValid.phone2 = false;
        this.notValid.phone = false;
        this.notValid.valid = true;


        if(  this.form.title.value.length < 5 || 80 <this.form.title.value.length) {
          this.notValid.title = true;
          this.notValid.valid = false;
        } 
        
        if( 128 < this.form.comment.value.length ) {
          this.notValid.comment  = true;
          this.notValid.valid = false;
        } 
      
        const phone1 = "+79";
        const phone2 = "89";
         
    
        
        for(let i=0; i<3;i++) {
      
          if(phone1[i] !== this.form.phone.value[i] && i<3) {
            this.notValid.phone1 = true;
          }
      
          if(phone2[i] !== this.form.phone.value[i] && i<2) {
            this.notValid.phone2 = true;
          }
    
        }
    
        if(this.form.phone.value.length !== 11 && this.notValid.phone2 === false) {
            this.notValid.phoneLenght = true;
            this.notValid.valid = false;
            this.notValid.phone = true;
        }
    
          if(this.form.phone.value.length !== 12 && this.notValid.phone1 === false) {
            this.notValid.phoneLenght = true;
            this.notValid.valid = false;
            this.notValid.phone = true;
        }
        
      
        if(this.notValid.phone1 && this.notValid.phone2) {
          this.notValid.valid = false;
          this.notValid.phone = true;
        } 

       // console.log('notValid\n');
       // console.log(this.notValid);

        this.setState( {
            refresh: !this.state.refresh 
        }) 
      }




    render()  {
            return(
            <div className="container-contact100">
                <div className="wrap-contact100">
                    <div className="contact100-form validate-form" >
                        <span className="contact100-form-title">
                            Message
                        </span>
        
                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input type="text" name="" placeholder="Phone number"
                            ref={(inputPhone) => { this.form.phone = inputPhone; }}
                            className={ this.notValid.phone? "input100 not-valid-data": "input100"}  
                            onChange={() => this.inputChange()} ></input>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                            <input name="" placeholder="Title" 
                            ref={(inputTitle) => { this.form.title = inputTitle; }}
                            className={ this.notValid.title? "input100 not-valid-data": "input100"} type="text" 
                            onChange={() => this.inputChange()}  ></input>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate = "Message is required">
                            <textarea name="text" placeholder="Your comment" 
                            ref={(inputMessage) => { this.form.comment = inputMessage; }}
                            className={ this.notValid.comment? "input100 not-valid-data": "input100"}
                            onBlur={() => this.disableButton()} 
                            onFocus={() => this.enableButton()}  
                            onChange={() => this.inputChange() } ></textarea>
                            <span className="focus-input100-1"></span>
                            <span className="focus-input100-2"></span>
                        </div>
        
                        <div className="container-contact100-form-btn">
                            <button className="contact100-form-btn" ref={(buttonSend) => { this.form.button = buttonSend; }}    
                            onMouseOver={() => this.mouseButtonOver()} 
                            onMouseOut={() => this.mouseButtonOut()}  disabled = { this.notValid.valid? false: true}  
                            onClick={() => this.click()}>
                                Send Comment
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



  export default connect(mapStateToProps)(formMessage);

