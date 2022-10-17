import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/RegisterForm2.css';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import firebaseConfig from '../config';
import {AuthContext} from '../Auth';
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import PersonalInfo from "./PersonalInfo"

//Toast Notification
const invalidAge = () => toast.warn("อายุไม่ถูกต้อง", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidFullName = () => toast.warn("ชื่อไม่ถูกต้อง", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidDisplayName = () => toast.warn("ชื่อแสดงไม่ถูกต้องไม่ถูกต้อง", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidGender = () => toast.warn("โปรดเลือกเพศ", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});
const invalidPhoneNum = () => toast.warn("เบอร์โทรไม่ถูกต้อง", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const RegisterForm2 = () => {

    //const {currentUser} = useContext(AuthContext);
    const history = useHistory();   // use to redirect

    const handleSubmit1 = async () => {
        
        const auth = getAuth(firebaseConfig);
        const user = auth.currentUser;  // get current user authentication

        const db = getDatabase();   // get database
        const uid = user.uid;   // get current user id

        // get personal data from form
        const fullName = document.querySelector('#fullName').value;
        const displayName = document.querySelector('#displayName').value;
        const gender = document.querySelector('#gender').value;
        const phoneNumber = document.querySelector('#phoneNumber').value;
        const birthday = document.querySelector('#birthday').value;

        //age calculation
        const bDate = new Date(birthday);
        const month_dif = Date.now() - bDate.getTime();
        const age_dif = new Date(month_dif);
        const year = age_dif.getFullYear();
        var age = Math.abs(year - 1970); 

        if(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(fullName)!=true){
        invalidFullName();
        }
        else if(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(displayName)!=true){
            invalidDisplayName();
        }
        else if(gender === "Gender"){
            invalidGender();
        }
        else if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber)!=true){
            invalidPhoneNum();
        }
        else if(age <= 8 || age >= 100 || Number.isNaN(age)){
            invalidAge();
        }else{
            try{
                // write data in firebase's realtime database
                set(ref(db, 'personalInfo/' + uid), {
                uid: uid,
                fullName: fullName,
                displayName: displayName,
                gender: gender,
                phoneNumber: phoneNumber,
                birthday: birthday
                });
            }catch(error){
                alert(error);
            }
        }
    }

    useEffect(() => {
        const progress = document.querySelector('.progress');
        const prev = document.querySelector('#prev');
        const next = document.querySelector('#next');
        const circles = document.querySelectorAll(".circle");
        const skip = document.querySelector('.skip');
        const select = document.querySelector('select');
        const date = document.querySelector('#birthday');

        //css handle
        select.addEventListener('change', () => {
            if(select.value !== "Gender"){
                select.classList.add('selected');
            }else select.classList.remove('selected');
        });

        date.addEventListener('focus', () => {
            date.setAttribute("type", "date");
        });

        date.addEventListener('focusout', () => {
            date.removeAttribute('type');
        })
        
        //css progress
        let numActive = 1;

        next.addEventListener('click', nextStep);


        prev.addEventListener('click', () =>{
            numActive--;
            if(numActive < 1)
                numActive = 1;
            update();
        });

        skip.addEventListener('click', skipStep);


        function update(){
            circles.forEach((circle,index) => {
                if(index < numActive){
                    circle.classList.add('active');
                }else {
                    circle.classList.remove('active');
                }
            });

            const actives = document.querySelectorAll('.active');

            progress.style.width = ((actives.length - 1) / (circles.length - 1) ) * 100 + "%";

            if(numActive === 1){
                prev.disabled = true;
            }else if(numActive === circles.length){
                next.innerHTML = "Submit";
                next.classList.add('submit');
            }else {
                if(next.innerHTML === 'Submit'){
                    next.innerHTML = 'Next';
                    next.classList.remove('submit');
                }
                prev.disabled = false;
                next.disabled = false;
            }
        }

        function nextStep(){
            if(numActive == 1) {
                handleSubmit1();
                history.push('/testp');
            }
            else if(numActive == 2) {

            }
            else if(numActive == 3) {

            }
            else if(numActive == 4) {
                history.push('/shop');
            }
            numActive++;
            if(numActive > circles.length)
                numActive = circles.length;
            update();
        }

        function skipStep(){
            if(numActive == 1) {
                history.push('/testp');
            }
            if(numActive == 4) {
                history.push('/shop');
            }
            numActive++;
            if(numActive > circles.length)
                numActive = circles.length;
            update();
        }

    }, []);
    return (
        <PersonalInfo/>
    );
}

export default RegisterForm2;
