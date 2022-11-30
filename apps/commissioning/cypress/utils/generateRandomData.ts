import { faker } from "@faker-js/faker"

export const getRandomEmail = () => `${faker.random.alphaNumeric(10)}@gmail.com`
export const getRandomName = () => `${faker.name.firstName()}`
export const getRandomSurname = () => `${faker.name.lastName()}`
export const getRandomNumber = (min: number, max: number) => `${faker.datatype.number({ min, max })}`
