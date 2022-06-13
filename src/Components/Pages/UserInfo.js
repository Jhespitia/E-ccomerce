import React from 'react'
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import '../Styles/userInfo.css'
import profile from '../Assets/Images/profile.png'

const UserInfo = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    alert('Logout Successful');
    navigate("/user");
  }

  return (
    <div>
      <NavBar />
      <div className="login-container">
        <div className="profile-img">
          <img className='profile-img' src={profile} alt="" />
        </div>

        <div
          className="userName"> "{localStorage.getItem("userName")}"
        </div>
        <button
          className='profile-btn btn btn-secondary'
          onClick={logout}>
          Log out
        </button>
      </div>

      <Footer />
    </div>
  )
}

export default UserInfo;