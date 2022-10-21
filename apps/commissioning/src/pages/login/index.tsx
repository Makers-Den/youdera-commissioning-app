import React, { useState } from 'react'
import { Checkbox } from 'ui/checkboxes/Checkbox'
import { Input } from 'ui/inputs/Input'

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

	const [password, setPassword] = useState<string>('')
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

	const [rememberUser, setRememberUser] = useState<boolean>(false)
	const handleChangeRememberUser = () => setRememberUser(!rememberUser)

	return <div>
		<div className='flex flex-col space-y-4'>
			<Input label='Email' placeholder='Type here' onChange={handleChangeEmail} value={email} icon='Envelope' />
			<Input label='Password' placeholder='Type here' icon='Unlock' onChange={handleChangePassword} value={password} />
			<div className='flex items-center'>
				<Checkbox label='Remember me' onClick={handleChangeRememberUser} isChecked={rememberUser} />
			</div>
		</div>
	</div>
}

export default Login