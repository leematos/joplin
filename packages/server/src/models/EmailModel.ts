import { Uuid, Email, EmailSender } from '../db';
import BaseModel from './BaseModel';

export interface EmailToSend {
	sender_id: EmailSender;
	recipient_email: string;
	subject: string;
	body: string;

	recipient_name?: string;
	recipient_id?: Uuid;
}

export default class EmailModel extends BaseModel<Email> {

	public get tableName(): string {
		return 'emails';
	}

	protected hasUuid(): boolean {
		return false;
	}

	public async push(email: EmailToSend) {
		EmailModel.eventEmitter.emit('saved');
		return super.save({ ...email });
	}

	public async needToBeSent(): Promise<Email[]> {
		return this.db(this.tableName).where('sent_time', '=', 0);
	}

}
