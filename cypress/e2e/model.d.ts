export interface RegistrationData {
	firstname: string
	lastname: string
	username: string
	password: string
	phoneNumber: string
	birthday: string
}

export interface LoginData {
	username: string
	password: string
}

export interface Registration {
	registration: RegistrationData
}

export interface Login {
	login: LoginData
}
