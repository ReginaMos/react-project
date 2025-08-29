export interface CountryRow {
    year: number;
    [key: string]: number | undefined;
}

export interface CountryData {
    name: string;
    isoCode?: string;
    data: CountryRow[];
}
