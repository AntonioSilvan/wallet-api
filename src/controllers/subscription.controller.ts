import { Request, Response, Router } from 'express';
import { route, GET, ALL, POST, PUT } from 'awilix-express';
import { SubscriptionService } from '../services/subscription.service';

@route('/subscriptions')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService){}

    @GET()
    async all(req: Request, res: Response){
        res.send( await this.subscriptionService.all());
    }

    @route(':id')
    async find(req: Request, res: Response){
        const id = parseInt(req.params.id);

        res.send(await this.subscriptionService.find(id));
    }

    @POST()
    async store(req: Request, res:Response){
        await this.subscriptionService.store({
            user_id: req.body.user_id,
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionCreateDto);
        res.send();
    }

    @route(':id')
    @PUT()
    async update(req: Request, res:Response){
        const id = parseInt(req.params.id);

        await this.subscriptionService.update(id,{
            code: req.body.code,
            amount: req.body.amount,
            cron: req.body.cron
        } as SubscriptionUpdateDto);
        res.send();        
    }
}