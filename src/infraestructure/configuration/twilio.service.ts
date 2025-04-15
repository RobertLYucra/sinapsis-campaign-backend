// src/twilio/twilio.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private client: Twilio;
  private readonly logger = new Logger(TwilioService.name);

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_SID');
    const authToken = this.configService.get<string>('TWILIO_TOKEN');
    this.client = new Twilio(accountSid, authToken);
  }

  // src/twilio/twilio.service.ts
async sendMessages(
    messages: { to: string; body: string }[],
    fromPhone?: string
  ): Promise<{ to: string; success: boolean }[]> {
    const from = fromPhone || this.configService.get<string>('TWILIO_PHONE');
    const results: { to: string; success: boolean }[] = [];
  
    for (const msg of messages) {
      try {
        const result = await this.client.messages.create({
          to: msg.to,
          from,
          body: msg.body,
        });
  
        results.push({ to: msg.to, success: !!result.sid });
      } catch (error) {
        console.error(`Error al enviar SMS a ${msg.to}: ${error.message}`);
        results.push({ to: msg.to, success: false });
      }
    }
  
    return results;
  }
  
}
