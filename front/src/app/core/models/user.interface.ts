import { Theme } from "./theme.interface";

export interface User {
	id: number,
	name: string,
	email: string,
	themes: Theme[]
}