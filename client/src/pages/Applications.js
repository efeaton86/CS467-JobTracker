import React from 'react';


function Applications() {
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
                    <h1 style={ textContainerStyle }>Applications Page</h1>
                    <p>Placeholder for applications page</p>
                </div>

            </div>
        </>
    );
}

export default Applications;