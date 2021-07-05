import express = require('express');
import { scopePerRequest } from 'awilix-express';
import { asClass, createContainer } from 'awilix';
import { TestService } from './services/test.service';
import { SubscriptionMysqlRepository } from './services/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        //Repositories
        subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),

        //Services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}