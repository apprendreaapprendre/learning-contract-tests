import axios from "axios";

export class HelloHttpRepository {
    constructor(private baseUrl: string) {

    }

    async hello(name: string): Promise<string> {
        const response = await axios.post<string>(`${this.baseUrl}/hello`, {
            name,
        });
        return response.data;
    }

}