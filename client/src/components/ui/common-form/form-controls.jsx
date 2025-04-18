import { Input } from "../input";
import { Label } from "../label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Textarea } from "../textarea";




function FormControls({formControls = [], formData, setFormData}) {
    
    function renderComponentByType(getControlItem){
        let element = null;
        const currentControlItemValue = formData[getControlItem.name]  || ''

        switch(getControlItem.componentType){
           
            case 'input':
                element = <Input
                    id = {getControlItem.name}
                    name = {getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    value = {currentControlItemValue}
                    onChange = {(e) => setFormData({...formData, [getControlItem.name] : e.target.value})}
                
                /> 
                break;
            case 'textarea':
                element = <Textarea
                    id = {getControlItem.name}  
                    name = {getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value = {currentControlItemValue}
                    onChange = {(e) => setFormData({...formData, [getControlItem.name] : e.target.value})}
                
                />
                break;
            case 'select':
                element = <Select
                          value={currentControlItemValue}
                          onValueChange={(value) => setFormData({...formData, [getControlItem.name] : value})}
                
                        >
                    <SelectTrigger className = 'w-full'>
                        <SelectValue placeholder={getControlItem.label} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length > 0 ?
                            getControlItem.options.map((optionsItem) => <SelectItem key={optionsItem.id} value={optionsItem.id}>{optionsItem.label}</SelectItem>) : null 
                        }

                    </SelectContent>

                </Select>
                break;
            
            default:
                element = <Input
                id = {getControlItem.name}
                name = {getControlItem.name}
                placeholder={getControlItem.placeholder}
                type={getControlItem.type}
                value = {currentControlItemValue}
                onChange = {(e) => setFormData({...formData, [getControlItem.name] : e.target.value})}
                
                
                />

        


        }

        return element
        

    }
  
    return (
    <div className='flex flex-col gap-4'>
        {
            formControls.map(controlItem => (
                <div key={controlItem.name}>
                    <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
                    {
                        renderComponentByType(controlItem)
                    }
                </div>

            ))
        }
        
    </div>
  )
}

export default FormControls