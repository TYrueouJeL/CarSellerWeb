export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: string[];
    phoneNumber: string;
    type: "customer" | "technician";
}
