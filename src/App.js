import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

function App() {
  
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [user, setUser] = useState('');
  const [calcList, setCalcList] = useState([]);

  useEffect(() => {
    updateList();
  }, [bmi])

  function calc(){
    setBMI(703*(weight/(height**2)));
  };
 
  function updateList(){
    let newCalc = [weight, height, bmi];
    setCalcList([...calcList, newCalc ]); 
  }

  return (
    <Authenticator>
        <div className="App">
          <h1 align="left">BMI Calculator</h1>
          <table>
            <tbody>
              <tr>
                <td align='right'><label id='height'>Height:</label></td>
                <td align='left'><input type='text' id='height' value={height} onChange={e => setHeight(e.target.value)}/></td>
              </tr>
              <tr>
                <td align='right'><label id="weight">Weight:</label></td>
                <td align='left'><input type='text' id='weight' value={weight} onChange={e => setWeight(e.target.value)}/></td>
              </tr>
              <tr>
                <td colSpan={2} align='center'><button id='calc' onClick={calc}>Calculate</button></td>
              </tr>
              <tr>
                <td align='right'><label id='bmi'>BMI:</label></td>
                <td align='left'><input type='text' id='bmi' readOnly value={bmi}/></td>
              </tr>
            </tbody>
          </table>
          <br/>
          <table id='calcs'  >
              <thead>
                <tr>
                  <th>Weight</th>
                  <th>Height</th>
                  <th>BMI</th>
                </tr>
              </thead>
              <tbody>
                {calcList.filter(entry => entry[2]>0).map((singleCalc) => 
                  <tr>
                    <td key={singleCalc[0]} >{singleCalc[0]}</td>
                    <td key={singleCalc[1]} >{singleCalc[1]}</td>
                    <td key={singleCalc[2]} >{singleCalc[2]}</td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
    </Authenticator>
  );
}

export default withAuthenticator(App);
