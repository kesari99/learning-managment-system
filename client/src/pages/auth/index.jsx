import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CommomForm from '@/components/ui/common-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signInFormControls, signUpFormControls } from '@/config'
import { AuthContext } from '@/context/auth-context'
import { GraduationCap } from 'lucide-react'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Authpage() {
    const [activeTab, setActiveTab] = useState('signin')
    const {
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser
    } = useContext(AuthContext)    

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    const CheckIfIsSignInFormValid = () => {
        return signInFormData && signInFormData.userEmail !== '' && signInFormData.password !== ''

    }

    const CheckIfIsSignUpFormValid = () => {
        return (
            signUpFormData && signUpFormData.userName !== '' &&
            signUpFormData.UserEmail !== '' && 
            signUpFormData.password !== ''
        )
    }



  return (
    <div className='flex flex-col min-h-screen'>
        <header className='px-4 lg:px-6 h-14 flex items-center boder-bottom'>
            <Link to={'/'} className='flex items-center justify-center'>
            <GraduationCap className='h-8 w-8 mr-4' />
            <span className='font-extrabold  text-xl'>LMS LEARN</span>
            
            </Link>

        </header>
        <div className='flex items-center justify-center min-h-screen bg-background'>
            <Tabs
                value={activeTab}
                defaultValue='signin'
                onValueChange={handleTabChange}
                className='w-full max-w-md'
            
            >
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='signin'>Sign In</TabsTrigger>
                    <TabsTrigger value='signup'>Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value='signin'>
                    <Card className='space-y-6 p-6'>
                        <CardHeader>
                            <CardTitle>Sign in to your account </CardTitle>
                            <CardDescription>Enter your email and password to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CommomForm 
                                formControls = {signInFormControls}
                                buttonText = 'Sign In'
                                formData={signInFormData}
                                setFormData={setSignInFormData}
                                isButtonDisabled={!CheckIfIsSignInFormValid()}
                                handleSubmit={handleLoginUser}
                            />
                        </CardContent>

                    </Card>
                </TabsContent>
                <TabsContent value='signup'>
                <Card className='space-y-6 p-6'>
                        <CardHeader>
                            <CardTitle>Create a new account </CardTitle>
                            <CardDescription>Enter your details to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CommomForm 
                                formControls = {signUpFormControls}
                                buttonText = 'Sign Up'
                                formData={signUpFormData}
                                setFormData={setSignUpFormData}
                                isButtonDisabled={!CheckIfIsSignUpFormValid()}
                                handleSubmit={handleRegisterUser}
                            />
                        </CardContent>

                    </Card>
                </TabsContent>
            </Tabs>
        </div>
        
    </div>
  )
}
