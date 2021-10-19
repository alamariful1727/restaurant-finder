export interface ISearchVenue {
	id: string;
	name: string;
	location: Location;
	categories: Category[];
	referralId: string;
	hasPerk: boolean;
}

interface Category {
	id: string;
	name: string;
	pluralName: string;
	shortName: string;
	icon: {
		prefix: string;
		suffix: string;
	};
	primary: boolean;
}

interface Location {
	address?: string;
	crossStreet?: string;
	lat: number;
	lng: number;
	labeledLatLngs: {
		label: string;
		lat: number;
		lng: number;
	}[];
	distance: number;
	postalCode?: string;
	cc: string;
	country: string;
	formattedAddress: string[];
	city?: string;
	state?: string;
}
