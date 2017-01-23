export let HOST = "";
export let API_HOST = "";


console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
console.log("host ", HOST);


if (process.env.NODE_ENV == "dev") {
    HOST = "http://localhost:3001";
    API_HOST = "http://stage.api.groww.in";
    // API_HOST = "https://mapi.groww.in";
} else if (process.env.NODE_ENV == "stage") {
    HOST = "http://stage.groww.in";
    API_HOST = "http://stage.api.groww.in"
} else if (process.env.NODE_ENV == 'preProd') {
    HOST = "https://next.groww.in";
    API_HOST = "https://mapi.groww.in";
} else if (process.env.NODE_ENV == "production") {
    HOST = "https://groww.in";
    API_HOST = "https://mapi.groww.in";
}

export const isDev = process.env.NODE_ENV == "dev";
export const isStage = process.env.NODE_ENV == "stage";
export const isPreProd = process.env.NODE_ENV == "preProd";
export const isProd = process.env.NODE_ENV == "production";
