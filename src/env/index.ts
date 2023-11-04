const BASE_URL: string = import.meta.env.VITE_BASE_URL as string;
const IMAGE_URL: string = import.meta.env.VITE_URL_IMAGE as string;

const APP_ENV = {
    BASE_URL: BASE_URL,
    IMAGE_URL: IMAGE_URL
}
export { APP_ENV };