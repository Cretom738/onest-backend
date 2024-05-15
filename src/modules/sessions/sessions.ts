import { ISession } from "src/libs/interfaces/session.interface";

export interface ISessionsService {

    createSession(data: ISession): Promise<void>;
    updateSession(data: ISession, oldAccessTokenId: number): Promise<void>;
    deleteSession(deviceId: number): Promise<void>;
}