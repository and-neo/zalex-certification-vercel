import axios from "axios";

// Requests are routed through the serverless API proxy.
const api = axios.create({
    baseURL: "/api",
});

export async function requestCertificate(formData) {
    const response = await api.post("/request-certificate", formData);
    return response.data;
}

export async function getCertificateRequests() {
    const response = await api.get("/request-list");
    return response.data;
}
