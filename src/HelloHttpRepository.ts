import axios from "axios";

export class HelloHttpRepository {
    constructor(private baseUrl: string) {

    }

    async hello(name: string): Promise<string> {
    try{
        const response = await axios.post<string>(`${this.baseUrl}/hello`, {
            name,
        });
        return response.data;
     } catch(err){
       throw new Error('Try again later');
     }
    }

}