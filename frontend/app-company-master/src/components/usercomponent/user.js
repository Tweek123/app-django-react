import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';


class User extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.user.id;
    }       

    render()  {
        switch (this.props.users[this.id].renderType) {    
            case "HOME_RENDER":
                return(  
                    <div className = "card">
                        <Link to={"/user?id="+this.id}><div src="" className = "avatar" style = { { backgroundImage: 'url('+this.props.users[this.id].avatarUrl+')', backgroundSize:'cover', backgroundRepeat: "no-repeat"} } ></div></Link>
                        <h1>{this.props.users[this.id].firstName}</h1>
                        <h1>{this.props.users[this.id].lastName}</h1>
                        <p className="title">{this.props.users[this.id].position}</p>
                    </div>
                )
            case "CAROUSEL_RENDER":
                return(
                    <div className = "card">
                        <Link to={"/user?id="+this.id}><div style = { { backgroundImage: 'url('+this.props.users[this.id].avatarUrl+')', backgroundSize:'cover', backgroundRepeat: "no-repeat"} } className = "avatar"></div></Link>
                    </div>
                    )
            default:
                break;
        }
      }
}



const mapStateToProps = (state) => {
    // console.log(state.routing.search);
    return {
    users: state.reducer.users
    };
  };
  
  export default connect(mapStateToProps)(User);
  



