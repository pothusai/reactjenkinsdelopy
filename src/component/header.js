import React, { Component } from "react";
import './header.css'
import { Link, withRouter } from "react-router-dom";

const url = "http://3.17.216.66:5000/api/auth/userinfo"

class Header extends Component {
    constructor(props){
        super(props)

        this.state={
            userData:'',
            socialData:''
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('userInfo');
        sessionStorage.setItem('loginStatus','loggedOut');
        sessionStorage.setItem('socialLogin', 'false');
        this.setState({userData:'' });
        this.setState({socialData:'' });
        this.props.history.push('/');
    }

    conditionalHeader = () => {
        if(this.state.userData.name || this.state.socialData.id){
            if(sessionStorage.getItem('socialLogin') === 'true'){
                let data = this.state.socialData;
                let img = data.photos[0].value
                return(
                    <div>
                        <Link to="/" className="btn btn-success">
                            <img src={img} style={{height:30,width:30}}/> &nbsp; 
                            Hi {data.name.giveName}
                        </Link> &nbsp;
                        <button onClick={this.handleLogout} className="btn btn-danger">
                            <span className="glyphicon glyphicon-log-out"></span> Logout
                        </button>
                    </div>
                )
            }else{
                let data = this.state.userData;
                sessionStorage.setItem('userInfo',JSON.stringify(data))
                sessionStorage.setItem('loginStatus','loggedIn')
                return(
                    <div>
                        <Link to="/" className="btn btn-success">
                            <span className="glyphicon glyphicon-user"></span> Hi {data.name}
                        </Link> &nbsp;
                        <button onClick={this.handleLogout} className="btn btn-danger">
                            <span className="glyphicon glyphicon-log-out"></span> Logout
                        </button>
                    </div>
                )
            }
        }else{
            return(
                <div>
                    <a href="http://localhost:9800/auth/google" className="btn">
                        <img src="https://i.ibb.co/37W2XwW/google.png" style={{height:30,width:30}}/>
                    </a> &nbsp;
                    <Link to="/login" className="btn btn-success">
                        <span className="glyphicon glyphicon-log-in"></span> LogIn
                    </Link> &nbsp;
                    <Link to="/register" className="btn btn-danger">
                        <span className="glyphicon glyphicon-user"></span> SignUp
                    </Link>
                </div>
            )
        }
    }


    render(){
        return(
            <div>
                <header>
                    <div id="brand">
                        Developer Funnel &nbsp; <Link to='/' className="btn btn-info">Home</Link>
                    </div>
                    <div id="social">
                        {this.conditionalHeader()}
                    </div>
                </header>
            </div>
        )
    }
    componentDidMount(){
        if(this.props.location.search){
            if(this.props.location.search.split('=')[0] === '?site'){
                let siteName = this.props.location.search.split('&')[0].split('=')[1]
                if(siteName === 'google'){
                    sessionStorage.setItem('socialLogin', 'true')
                    let id = this.props.location.search.split('&')[1].split('=')[1];
                    fetch(`http://localhost:1234/users/${id}`,{method:'GET'})
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({
                            socialData:data
                        })
                    })
                }
            }
        }else{
            fetch(url,{
                method:"GET",
                headers:{
                    'x-access-token':sessionStorage.getItem('ltk')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userData:data
                })
            })
        }
    }
}

export default withRouter(Header);