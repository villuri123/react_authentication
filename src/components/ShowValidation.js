import React from 'react'

function ShowValidation({content,type }) {
    if (!content){
      return null;
    } 
    if(!type){
      type="error"  
    }
    return (
      <div className={`validation-message text-center p-3 ${type === 'error' ? 'error_background' : 'success_background'}`} >
        {content}
      </div>
    );
}

export default ShowValidation;