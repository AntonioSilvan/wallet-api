import { ApplicationException } from "../common/exceptions/application.exception";
import { Subscription } from "./domain/subscription";
import { SubscriptionRepository } from "./subscription.repository";

export class SubscriptionService {
    constructor(
        private readonly subscriptionRepository: SubscriptionRepository
    ){}

    async find(id:number){
        return await this.subscriptionRepository.find(id);
    }

    async all(){
        return await this.subscriptionRepository.all();
    }

    async store(entry: SubscriptionCreateDto){
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);

        if(!originalEntry){
            this.subscriptionRepository.store(entry as Subscription)
        } else {
            throw new ApplicationException('El usuario ya existe');
        }
    }

    async update(id: number, entry: SubscriptionUpdateDto){
        let originalEntry = await this.subscriptionRepository.find(id);

        if(originalEntry){
            originalEntry.code = entry.code;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
        } else {
            throw new ApplicationException('Las subscripcion no ha sido encontrada');
        }
    }

    async remove(id: number){
        await this.subscriptionRepository.remove(id);
    }
}