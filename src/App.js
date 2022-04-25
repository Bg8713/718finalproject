import './App.css';
import React, { useEffect, useState } from 'react';
import { withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'
// import '@aws-amplify/ui-react/styles.css';
import { DataStore } from '@aws-amplify/datastore';
import { Calculation } from './models';

function App() {
  
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(0);
  const [models, setModels] = useState([]);

  async function createCalc(){
    await DataStore.save(
      new Calculation({
        "Height": height,
        "Weight": weight,
        "BMI": bmi
      })
    );
  }

  async function fetchCalcs(){
    let calcs = await DataStore.query(Calculation);
    setModels(calcs);
  }

  useEffect(() => {
    setModels([]);
  },[''])
  
  useEffect(() => {
    if (bmi != 0){
      createCalc();
    }
    fetchCalcs();
    console.log(models);
  }, [bmi])

  function calc(){
    setBMI(703*(weight/(height**2)));
    
  };

  return (
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
              <th>Date</th>
            </tr>
          </thead>
          {/* <tbody>
            {models.map((singleCalc) => 
              <tr>
                <td key={singleCalc.Weight} >{singleCalc.Weight}</td>
                <td key={singleCalc.Height} >{singleCalc.Height}</td>
                <td key={singleCalc.BMI} >{singleCalc.BMI}</td>
                <td key={singleCalc.createdAt} >{singleCalc.createdAt}</td>
              </tr>
            )}
          </tbody> */}
        </table>
        <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator(App);
