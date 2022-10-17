import React from 'react';
import '../css/TestCheckOut.css';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { useHistory } from 'react-router-dom';

const TestCheckOut = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getDatabase();
    const history = useHistory();

    const writeUserData = (e) => {
        e.preventDefault();
        const cardNumber = document.querySelector('#cardNumber').value;
        const cardHolder = document.querySelector('#cardHolder').value;
        const CVC = document.querySelector('#CVC').value;
        const month = document.querySelector('#month').value;
        const year = document.querySelector('#year').value;

        set(ref(db, 'creditCardInfo/' + uid), {
          cardNumber: cardNumber,
          cardHolder: cardHolder,
          CVC: CVC,
          month: month,
          year: year
        });
        alert('save success');
        // history.push("/"); go some where
    }

    /*
    get(child(ref(db), `creditCardInfo/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // do something
        } else {
            
        }
    }).catch((error) => {
        console.error(error);
    });*/

    return(
        <div className='main'>
            <div className='testdiv'>
                <div className='info'>
                    <div className='left'>
                        LOGO
                    </div>
                    <div className='right'>
                        <p>03:55</p>
                        <p>time left!</p>
                    </div>
                    <div className='cardInfo'>
                        <p>Card Number</p>
                        <div className='describe'>
                            <p>Enter the 16-digit card number on the card</p>
                            <input type='number' id='cardNumber' name='cardNumber' required></input>
                        </div>
                    </div>
                    <div className='cardInfo'>
                        <p>Card Name Holder</p>
                        <div className='describe'>
                            <p>Enter name card holder on the card</p>
                            <input type='text' id='cardHolder' name='cardHolder' required></input>
                        </div>
                    </div>
                    <div className='cardInfo'>
                        <p>CVC Number</p>
                        <div className='describe'>
                            <p>Enter the 3 digits number on the card</p>
                            <input type='number' id='CVC' name='CVC' required></input>
                        </div>
                    </div>
                    <div className='cardInfo'>
                        <p>Expiry Date</p>
                        <div className='describe'>
                            <p>Enter the expiration date of the card</p>
                            <input type='number' style={{width: 62}} id='month' name='month' placeholder='MM' required></input>
                            <input type='number' style={{width: 62}} id='year' name='year' placeholder='YY' required></input>
                        </div>
                    </div>
                    <button className='btn-pay' onClick={writeUserData}>Pay Now</button>
                </div>
                <div className='card'>
                    <div className='bf-vc'>
                        <div className='virtualCredit'>
                            
                        </div>
                    </div>
                    <div className='showInfo'>
                        <div className='marg'>
                            <div className='infoHeader'>
                                <p>OrderNumber</p>
                            </div>
                            <div className='infoHeader'>
                                <p>Product</p>
                            </div>
                            <div className='infoHeader'>
                                <p>VAT(7%)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestCheckOut;