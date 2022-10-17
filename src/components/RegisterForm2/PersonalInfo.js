import React from 'react';
import '../css/RegisterForm2.css';

const PersonalInfo = () => {
    return (
        <div className="container">
            <div className="navBar"></div>
            <div className="container-con">
                <div className="col-lg-5">
    
                    <div className="progress-container">
                        <div className="progress"></div>
                        <div className="circle active"><span className="p one">1</span></div>
                        <div className="circle"><span className="p two">2</span></div>
                        <div className="circle"><span className="p three">3</span></div>
                        <div className="circle"><span className="p four">4</span></div>
                    </div>
                    <div className="Information">
                        <div className="header">
                            <p className="head">Welcome! First things first...</p>
                            <p className="sub-head">You can always change them later</p>
                        </div>
        
                        <div className="f_name">
                            <input type="text"  className="form-control" placeholder="Full Name" id="fullName"/>
                        </div>
        
                        <div className="d_display">
                            <input type="text" className="form-control" placeholder="Display name" id="displayName"/>
                        </div>
                        <div className="dropdown">
                            <select className="form-control" id="gender">
                                <option >Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="LGBTQ+">LGBTQ+</option>
                            </select>
                        </div>
        
                        <div className="phone">
                            <input type="text" className="form-control" id="phoneNumber" placeholder="Phone number"/>
                        </div>
        
                        <div className="date">
                            <input placeholder="Date" className="form-control" id='birthday'/>
                        </div>
                    </div>
                    <div className="btn-set">
                        <div className="wrap">
                            <button className="btn" id="prev" disabled>Prev</button>
                        </div>
                        <div className="wrap">
                            <button className="btn" id="next">Next</button>
                        </div>
                    </div>

                    <a href="#" className="skip">skip</a>
                </div>
            </div>
        </div>
    );
}


export default PersonalInfo;