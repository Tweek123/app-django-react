import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render()  {
        
        return(
            <div className = "header">
                <ul className = "header__menu">
                    <li>
                        UserName
                    </li>
                    <li>
                        <Link to={"/statistics"}>
                             Статистика
                        </Link>
                    </li>
                    <li>
                        <Link to={"/users"}>
                             Пользователи
                        </Link>
                    </li>
                    <li>
                        <Link to={"/login"}>
                             Выход    
                        </Link>
                    </li>
                    <li>
                        <Link to={"/page"}>
                             page
                        </Link>
                    </li>
                </ul>
            </div>
        )
      }
}



export default Header




