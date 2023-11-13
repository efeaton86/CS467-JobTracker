import React from 'react';


function Skills() {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const textContainerStyle = {
    textAlign: 'center',
  };

    return (
        <>
            <div style={ containerStyle }>
                <div style={textContainerStyle}>
                    <h1 style={ textContainerStyle }>Skills Page</h1>
                    <p>Placeholder for skills page</p>
                </div>

            </div>
        </>
    );
}

export default Skills;