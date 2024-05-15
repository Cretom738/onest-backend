import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class ArgonService {

    async hash(data: string): Promise<string> {
        return argon2.hash(data);
    }

    async compare(data: string, hash: string): Promise<boolean> {
        try {
            return argon2.verify(hash, data); 
        } catch (error) {
            return false;
        }
    }
}
