const Step1 = ({ change }) => {
  return (
    <step-1>
      <label htmlFor="gameName">Nombre del juego</label>
      <br />
      <input type="text" name="gameName" id="gameName" onChange={change} />
      <br />
      <label htmlFor="numExe">N&uacute;mero de ejercicios</label>
      <br />
      <input type="number" name="numExe" id="numExe" onChange={change} min='1' max='15' />
      <br />
    </step-1>
  )
}
export default Step1;
