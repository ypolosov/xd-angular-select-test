import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PlatformLocation, DatePipe } from "@angular/common";
import { CustomPlatformLocation } from "./customPlatformLocation";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		DatePipe,
		{ provide: PlatformLocation, useClass: CustomPlatformLocation },
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
