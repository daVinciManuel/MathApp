import { useState } from "react";
import DataExe from "./DataExe";
const Step2 = ({ change, currentExe }) => {
  const [numTerms, setNumTerms] = useState(2)
  console.log(numTerms)
  return (<step-2>
    <h2>Ejercicio {currentExe}</h2>
    <label htmlFor="numExe">Cantidad de elementos num&eacute;ricos</label>
    <br />
    <input onChange={(e) => { setNumTerms(e.target.value) }} type="number" name="numTerms" id="numTerms" min='2' max='10' />

    {/* // Load Exercise config */}
    <DataExe numTerms={numTerms} />
    <br />
  </step-2>
  )
}
export default Step2;
