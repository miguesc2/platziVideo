import React from 'react';
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import classNames from "classnames"
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = props => {
  const { user, isLogin, isRegister } = props
  const hasUser = Object.keys(user).length > 0

  const handleLogout = () => {
    props.logoutRequest({})
  }

  //const headerClass = classNames("header", { isLogin, isRegister, })
  const headerClass = (useLocation().pathname === '/register' || useLocation().pathname === '/login') ? 'greenHeader' : 'header';

  return (
    <header className={ headerClass }>
      <Link to="/"><img className="header__img" src={ logo } alt="Platzi Video" /></Link>
      <div className="header__menu">
        <div className="header__menu--profile">
        <img src={ hasUser ? gravatar(user.email) : userIcon } alt={ user.email } />
          <p>Perfil</p>
        </div>
        <ul>
          { hasUser ?
            <>
              <li><a href="/">{user.name}</a></li>
              <li><a to="#logout" onClick={ handleLogout }>Cerrar Sesión</a></li>
            </> 
            : 
            <li><Link to="/login">Iniciar Sesión</Link></li> 
          }
        </ul>
      </div>
    </header>
  )
};

Header.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logoutRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
