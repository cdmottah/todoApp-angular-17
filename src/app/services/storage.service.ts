import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { }

	setItemOnStorage(data: any, name: string, defaultValue?: any) {
		if (!data || JSON.stringify(data) == JSON.stringify(defaultValue)) {
			localStorage.removeItem(name);
			return;
		}
		localStorage.setItem(name, JSON.stringify(data));
	}

	getItemOnStorage<T>(name: string, defaultValue: T): T {
		const data = localStorage.getItem(name);
		if (data == null) return defaultValue;
		if (data == "null") return defaultValue;
		if (data == undefined) return defaultValue;
		if (data == 'undefined') return defaultValue;
		if (data == "") return defaultValue;
		const response = JSON.parse(data) as T;
		return response
	}
}
