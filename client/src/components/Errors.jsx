import React from "react";

export default function Errors({ errors }) {
  if (Object.keys(errors).length > 0)
    return (
      <div style={{ marginTop: 8 }}>
        Errors:
        <ul>
          {Object.values(errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </div>
    );
  else return <></>;
}
