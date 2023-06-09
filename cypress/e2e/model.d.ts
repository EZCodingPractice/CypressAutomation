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

export interface User {
	firstName: string
	lastName: string
	age: string
	userEmail: string
	salary: string
	department: string
}

export interface PersonData {
	firstName: string
	lastName: string
	age: string
	userEmail: string
	salary: string
	department: string
}

export interface Person {
	user1: PersonData
}
