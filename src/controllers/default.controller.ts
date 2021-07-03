import { GET, route } from 'awilix-express';
import { Request, Response} from 'express';
import { TestService } from '../services/test.service';

@route('/')
export class DefaultController{
    
    constructor(private readonly testService: TestService){}

    @route('test')
    @GET()
    public index(req: Request, res: Response): void{
        res.send({
            status: true,
            message: "Default controller on"
        });
    }

    @route('index')
    @GET()
    public start( req:Request, res:Response){
        res.send({
            status: true,
            message: "Start the application"
        })
    }
}