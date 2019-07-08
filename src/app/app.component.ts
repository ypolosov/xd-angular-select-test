import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	title = "sample-plugin";
	htmlValue = "some <b>formated</b> value";

	public readonly platforms = [
		{ name: "iOS", baselines: [ { name: "@1x", value: 1 }, { name: "@2x", value: 2 } ] },
		{ name: "Android", baselines: [ { name: "mdpi", value: 1 }, { name: "hdpi", value: 2 } ] },
	];

	public platform: any;
	public baseline: any;

	public platformChanged() {
		this.baseline = this.platform.baselines[0];
		console.log("Changed");
	}

	ngOnInit(): void {
		this.platform = this.platforms[0];
		this.baseline = this.platform.baselines[0];
	}
}
