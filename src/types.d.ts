declare namespace App {
	interface Locals {
		weatherCache?: {
			data: {
				temp: number;
				emoji: string;
				loading: boolean;
			};
			timestamp: number;
		};
	}
}
