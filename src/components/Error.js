import React from 'react'

export const Error = ({mensaje}) => {
    return (
        <div className="alert alert-danger text-center p-4 m-3">

            <strong>{mensaje}</strong>
            
        </div>
    )
}
