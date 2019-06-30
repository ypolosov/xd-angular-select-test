import { PlatformLocation, LocationChangeListener } from "@angular/common";


export class CustomPlatformLocation extends PlatformLocation {
	// https://angular.io/api/common/PlatformLocation#pathname
	// Sample implementation available in node_modules\@angular\platform-browser\bundles\platform-browser.umd.js
	// https://github.com/devote/HTML5-History-API/blob/master/history.js
	private stateListeners: LocationChangeListener[] = [];
	private hashListeners: LocationChangeListener[] = [];

	public get pathname(): string {
		// console.log("pathname");
		return "";
	}
	public get search(): string {
		// console.log("search");
		return "";
	}
	public get hash(): string {
		// console.log("hash");
		return "";
	}
	public getBaseHrefFromDOM(): string {
		// looks for base element in DOM and returns its href value
		return "/";
	}

	public onPopState(fn: LocationChangeListener): void {
		this.stateListeners.push(fn);
		// console.log("onPopState");
	}
	public onHashChange(fn: LocationChangeListener): void {
		this.hashListeners.push(fn);
		// console.log("onHashChange");
	}

	public replaceState(state: any, title: string, url: string): void {
		// console.log("replaceState", arguments);
	}
	public pushState(state: any, title: string, url: string): void {
		// console.log("pushState", arguments);
	}
	public forward(): void {
		// console.log("forward");
	}
	public back(): void {
		// console.log("back");
	}
}
