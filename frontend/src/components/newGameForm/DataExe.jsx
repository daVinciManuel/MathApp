const smallInput = {
  width: '3rem'
}

const DataExe = ({ numTerms }) => {
  return (
    <>
      <div style={{ width: '400px', border: '1px solid black', padding: '1rem' }}>
        {Array.from({ length: numTerms }).map((_, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <label>Num {i + 1}</label>
            <br />
            Min:
            <input type="number" style={smallInput} name={`min${i + 1}`} />
            &nbsp; Max:
            <input type="number" style={smallInput} name={`max${i + 1}`} />
            {i < numTerms - 1 && (
              <span style={{ marginLeft: "0.5rem" }}>
                <label>
                  <input
                    type="radio"
                    name={`op${i + 1}`}
                    value="+"
                    defaultChecked
                  />{" "}
                  +
                </label>

                <label style={{ marginLeft: "0.5rem" }}>
                  <input
                    type="radio"
                    name={`op${i + 1}`}
                    value="-"
                  />{" "}
                  -
                </label>
              </span>
            )}
          </div>
        ))}
      </div >
    </>
  )
}

export default DataExe

