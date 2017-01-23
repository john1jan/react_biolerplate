export let HOST = "";
export let API_HOST = "";


console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
console.log("host ", HOST);


if (process.env.NODE_ENV == "dev") {
    HOST = "http://localhost:3001";
    API_HOST = "http://stage.example.com";
} else if (process.env.NODE_ENV == "stage") {
    HOST = "http://stage.example.com";
    API_HOST = "http://stage.api.example.com"
} else if (process.env.NODE_ENV == 'preProd') {
    HOST = "https://pre.example.com";
    API_HOST = "https://mapi.example.com";
} else if (process.env.NODE_ENV == "production") {
    HOST = "https://example.com";
    API_HOST = "https://mapi.example.com";
}

export const isDev = process.env.NODE_ENV == "dev";
export const isStage = process.env.NODE_ENV == "stage";
export const isPreProd = process.env.NODE_ENV == "preProd";
export const isProd = process.env.NODE_ENV == "production";
