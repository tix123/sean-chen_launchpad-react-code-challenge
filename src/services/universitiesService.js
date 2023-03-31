
export const countryConvert = (country) => {
    switch (country) {

        case "Bolivia":
            return "Bolivia, Plurinational State of"

        case "British Virgin Islands":
            return "Virgin Islands, British"

        case "Brunei":
            return "Brunei Darussalam"

        case "Democratic Republic of the Congo":
            return "Congo, the Democratic Republic of the"

        case "Ivory Coast":
            return "Côte d'Ivoire"

        case "Laos":
            return "Lao People's Democratic Republic"

        case "Macau":
            return "Macao"

        case "Macedonia":
            return "North Macedonia"

        case "Moldova":
            return "Moldova, Republic of"

        case "North Korea":
            return "Korea, Democratic People's Republic of"

        case "Palestinian Territory":
            return "Palestine, State of"

        case "Russia":
            return "Russian Federation"

        case "South Korea":
            return "Korea, Republic of"

        case "Syria":
            return "Syrian Arab Republic"

        case "Tanzania":
            return "Tanzania, United Republic of"

        case "Vatican":
        case "Vatican City State (Holy See)":
            return "Holy See (Vatican City State)"

        case "Venezuela":
            return "Venezuela, Bolivarian Republic of"

        case "Vietnam":
            return "Viet Nam"

        default:
            return country

    }
}