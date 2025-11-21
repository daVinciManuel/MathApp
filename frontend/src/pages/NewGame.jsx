import axios from "axios";
import { useState } from "react";
import Modal from "../components/Modal";
import Step1 from "../components/newGameForm/Step1";
import Step2 from "../components/newGameForm/Step2";


let limitSteps = 15 + 1;
const NewGame = () => {

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
  });
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  if (step !== 0) {
    limitSteps = parseInt(formData.numExe) + 1
  }
  console.log(`limitSteps: ${limitSteps}`)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlEncoded = new URLSearchParams();
    for (const key in formData) {
      urlEncoded.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/customGames/save",
        // "https://mathapp-ug8r.onrender.com/api/customGames/save",
        urlEncoded,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.message);
      if (err.response.data.error === "Validation error")
        setMessage("Usuario no diponible");
      setShowModal(true);
    }
  };
  console.log(step);
  return (
    <>
      <h1>Creaci&oacute;n de juego</h1>
      <form onSubmit={handleSubmit}>
        {step === 0 && (<Step1 change={handleChange} />)}
        {step > 0 && step < limitSteps && (<Step2 change={handleChange} currentExe={step} />)}
        {step > 0 && (<button onClick={() => { setStep(step - 1) }} type="button">Volver</button>)}
        {step < limitSteps && (<button onClick={() => { setStep(step + 1) }} type="button">Siguiente</button>)}
        {step === limitSteps && (<button>Guardar juego</button>)}
      </form>
      <Modal
        isOpen={showModal}
        message={message}
        onClose={() => { setShowModal(false) }} />
    </>
  )
}
export default NewGame
