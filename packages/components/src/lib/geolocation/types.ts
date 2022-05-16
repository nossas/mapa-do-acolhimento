interface GoogleMapsAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleMapsResults {
  address_components: GoogleMapsAddressComponent[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address?: string;
}

export type GoogleMapsResponse = {
  results: GoogleMapsResults[];
  status: string;
  error_message?: string;
};

export type IndividualGeolocation = {
  cep: string | null;
  address: string;
  state: string | null;
  city: string;
  latitude: string | null;
  longitude: string | null;
};

export type AddressComponent = Array<{
  types: string[];
  short_name: string;
}>;

export type ComposeAddress = {
  state?: string;
  city?: string;
  cep?: string;
  address?: string;
  neighborhood?: string;
  email: string;
};

export type BrasilApiResponse = {
  statusText: string;
  data: BrasilApiResponseData;
};

export type BrasilApiResponseData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
};

export type LatLngAddressWithOpenCage = {
  latitude: string | null;
  longitude: string | null;
  address: string | null;
};

export type OpenCageResponse = {
  data: {
    status: {
      code: number;
      message: string;
    };
    results: Array<{
      geometry: {
        lat: number;
        lng: number;
      };
      formatted: string;
    }>;
  };
};
