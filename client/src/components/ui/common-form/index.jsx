  import { Button } from "../button"
  import FormControls from "./form-controls"





  function CommomForm({
    handleSubmit, 
    buttonText, 
    formControls = [], 
    formData, 
    setFormData,
    isButtonDisabled
  }) {
    return (
      <form onSubmit={handleSubmit}>
          {/* render from controls here */}

          <FormControls formControls = {formControls} formData={formData} setFormData={setFormData} />

          <Button disabled={isButtonDisabled} type='submit' className='mt-5 w-full' >{buttonText || 'Submit'}</Button>

      </form>
    )
  }

  export default CommomForm