import { Navigate } from 'react-router-dom';
import firebaseConfig from '../config';

import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import React, { useState,useEffect, useContext } from 'react';
import {AuthContext} from '../Auth';



//declare variable 
var creditcard
var cvv
var expdate
var month
var year



const RegisterForm3 = ({}) => {

    const {currentUser} = useContext(AuthContext);


    //const [skip, setSkip ] = useState(null);
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const auth = getAuth(firebaseConfig);
        const user = auth.currentUser;  // get current user authentication

        const db = getDatabase();   // get database
        const uid = user.uid;   // get current user id

        creditcard = document.querySelector('#creditcard').value;
        cvv = document.querySelector('#cvv').value;
        expdate = document.querySelector('#expdate').value;
        month =document.querySelector('#mm').value;
        year =document.querySelector('#yy').value;
         // /^(?:5[1-5][0-9]{14})$/ // Master Card
        const regex_creditCard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/ //Master Card start with 5 only number
       
        //const regex_expd =/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        const regex_mm = /^(0[1-9]|1[0-2])$/
        const regex_yy = /^([0-9]{4})$/

        const regex_cvv =/^[0-9]{3}$/ // Validate CVV 

        //Calculate Expire date

        var today, inputday;
            today = new Date();
            inputday = new Date();
           inputday.setFullYear(year, month-1, 1); //or month-1 ??? 
            var dif = Date.now()-inputday.getTime();   //Date.now() milisec
            alert(dif + " " + Date.now() + " " + inputday.getTime() + " " + inputday);
        
        var fifth_year =157784760000; //milisecond of 5 year
            
        if(creditcard ==""&& month==""&& year==""&& cvv=="")
        {
            alert("Please input your Credit Card")
        }
        else if(regex_creditCard.test(creditcard)!=true)
        {
            alert("Invalid Card number ");
        }
        else if(regex_mm.test(month)!=true)
        {
            alert("Please check your input month")
        }
        else if(regex_yy.test(year)!=true)
        {
            alert("Please check your input Year")
        }
        else if(regex_cvv.test(cvv)!=true)
        {
            alert('Invalid CVC')
            
        }
        else if(dif>0)
        {
            alert("This credit card already expired")
        }
        else
        {
           
            try{
                set(ref(db, 'creditCardInfo/' + uid), {
                    uid: uid,
                    creditcard: creditcard,
                    cc_month: month,
                    cc_year: year,
                    cvc: cvv,
                    
                    });
  
            }catch(error){
                alert(error);
            }
        }

       
            
        
            

        function validate_creditCard()
        {
            const regex_creditCard = /^(?:5[1-5][0-9]{14})$/ // Master Card
            if(regex_creditCard.test(creditcard)==true)
            {
                return true
            }
            else
            {
                
                return false //invalid format
                alert("Invalid Credit Card ") 
            }
        }
        function validate_expire()
        {
            const regex_expd =/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

            // minus with present date

            // Expire date calculation
            // const bDate = new Date(birthday);
            // const month_dif = Date.now() - bDate.getTime();
            // const age_dif = new Date(month_dif);
            // const year = age_dif.getFullYear();
            // var age = Math.abs(year - 1970); 
            




        }
        function validate_CVV()
        {
            const regex_cvv =/^[0-9]{3}$/ // Validate CVV 
            if(regex_cvv.test(cvv)==true)
            {
                return true
            }
            else
            {
                return false //invalid format 
                alert("Invalid Code ") 
            }
        }
    }
    


    return (
        <div className="container">
            <div className="container-con">
                <div className="col-lg-5">

                    

                    <div className="creditcard">
                        <input data-testid="cc" type="number" className="form-control" placeholder="Card Number" id="creditcard" name='Creditcard' />
                    </div>

                    <div className="expdate">
                        <input data-testid="expdate" type="text" className="form-control" placeholder="MM/YY" id="expdate" name='Expiration Date' />
                    </div>

                    <div className="MM">
                        <input data-testid="mm" type="number" className="form-control" placeholder="MM" id="mm" name='mm' />
                    </div>

                    <div className="YY">
                        <input data-testid="yy" type="number" className="form-control" placeholder="YY" id="yy" name='yy' />
                    </div>
                    <div className="CVV">
                        <input data-testid="cvv" type="number" className="form-control" id="cvv" name='cvv' placeholder="CVC"/>
                    </div>

                    <div className="btn-set">
                        <a href="" onClick={handleSubmit}>
                            <div className="wrap">
                                <button className="btn" id="submit">Submit</button>
                                
                            </div>
                            
                        </a>
                        <button className="btn" id="submit" >SKIP this shit </button>
                       
                    </div>
                        

                </div>
            </div>
        </div>
    );
}

export default RegisterForm3;
