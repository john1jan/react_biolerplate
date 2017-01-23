import * as ENV from "./env";
// COLORS used in  Components
export const COLORS = {
    GROWW_BASE_LIGHT: "#33c2b0",
    GROWW_BASE_DARK: "#1ca291",
    GROWW_GRADIENT_RIGHT: "#33A6BC",
    GROWW_MAIN_HEADING: '#58627c',
    GROWW_MAIN_PARAGRAPH: "#a9b5c1",
    LIGHT_GREY: "#f5f7f6",
    WHITE: "#FFFFFF",
    RED: "#EF5350",
    GREY: "#6f6f6f",
    DISABLED_GREY: "#9aa9a4",
    DARK_PARA_GREY: "#8899ab",
    BASE__LIGHT_GREY: "#f7f8fc",
    BUTTON_SHADOW_COLOR: "#26655d"
}

// SIZES used throught out the code
export const SIZES = {
    FONT_SIZE: "10px"
}

// KEYS/CONSTANTS used in the code
export const CONSTANTS = {
    SESSION_ID: "SESSION_ID",
    MOBILE_NUMBER: "MOBILE_NUMBER",
    USER_NAME: "USER_NAME",
    USER_EMAIL: "USER_EMAIL"
}


export let segmentAnalyticsKey = "";
if (ENV.isDev || ENV.isStage) {
    segmentAnalyticsKey = "\" Your Stage KEY \""
} else if (ENV.isPreProd) {
    segmentAnalyticsKey = "\"Your PreProd KEY \""
} else if (ENV.isProd) {
    segmentAnalyticsKey = "\" Your Prod KEY \""
}
